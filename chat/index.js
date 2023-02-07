const Chat = require("../models/Chat");
const User = require("../models/User");
const io = require("../index");

module.exports = (socket) => {
  if (socket != null) {
    // welcome message
    socket.emit("welcome", "welcome to chatting functionality of femstich app");

    // requesting userId
    io.to(socket.id).emit("userId", "send your userId");

    // when receiving userId
    socket.on("recieve-userId", async (userId) => {
      let user = await User.findOne({ _id: userId });
      if (!user) {
        io.to(socket.id).emit("invalid-user", "user not found with that id.");
      }
      user.socketId = socket.id;
      user.isOnline = true;
      await user.save();
      io.to(socket.id).emit("userId", user._id);
      console.log("user " + socket.id + " is connected.");

      const chats = await Chat.find({ sender: userId }).aggregate([
        {
          $unwind: "$chats",
        },
        {
          $match: {
            "chats.messages.read": false,
          },
        },
        {
          $group: {
            _id: "$chats.receiver",
            unreadCount: {
              $sum: 1,
            },
            lastMessage: {
              $last: "$chats.messages.message",
            }
          },
        },
      ])
      const populatedChats = await Chat.populate(chats, {
        path: "_id",
        select: "username profileImage",
      });
       const suser = await User.findById({_id: userId}).populate({
          path: "sender",
          select: "username prfileImage isOnline lastOnline",
        })
      socket.emit("recieve-all-chats", {user: suser,populatedChats});
    });

    // send message to other user
    socket.on("send-message", async (options) => {
      const { sender, receiver, message } = options;

      // for sender
      let schat = await Chat.findOne({ sender: sender });
      if (!schat) {
        // create new chat for sender
        schat = new Chat.create({
          sender: sender,
          chats: [
            {
              receiver: receiver,
              messages: [
                {
                  message: message,
                  userType: "sender",
                  time: Date.now(),
                },
              ],
            },
          ],
        });
      } else {
        // check reciever in schat
        let rfound = false;
        for (let r in schat.chats) {
          if (r.receiver == receiver) {
            rfound = true;
            r.messages.push({
              message: message,
              userType: "sender",
              time: Date.now(),
            });
          }
        }
        if (!rfound) {
          schat.chats.push({
            receiver: receiver,
            messages: [
              {
                message: message,
                userType: "sender",
                time: Date.now(),
              },
            ],
          });
        }
        await schat.save();
        socket.emit("message-saved", "message saved successfully.");
      }

      //for reciever
      let rchat = await Chat.findOne({ sender: receiver });
      if (!rchat) {
        rchat = new Chat.create({
          sender: receiver,
          chats: [
            {
              receiver: sender,
              messages: [
                {
                  message: message,
                  userType: "receiver",
                  time: Date.now(),
                },
              ],
            },
          ],
        });
      } else {
        let sfound = false;
        for (let s in rchat.chats) {
          if (s.receiver == sender) {
            sfound = true;
            s.messages.push({
              message: message,
              userType: "receiver",
              time: Date.now(),
            });
          }
        }
        if (!sfound) {
          rchat.chats.push({
            receiver: sender,
            messages: [
              {
                message: message,
                userType: "receiver",
                time: Date.now(),
              },
            ],
          });
        }
        await rchat.save();
        socket.emit("message-sent", "message successfully sent to receiver");
      }

      let ruser = await User.findOne({ _id: receiver });
      if (ruser.socketId) {
        io.to(ruser.socketId).emit("new-message-received", {
          sender: await User.findById(sender).select("username profileImage"),
          message,
        });
      }
    });

    // get user all chats
    socket.on("get-all-chats", async (senderId) => {

      const chats = await Chat.find({ sender: senderId }).aggregate([
        {
          $unwind: "$chats",
        },
        {
          $match: {
            "chats.messages.read": false,
          },
        },
        {
          $group: {
            _id: "$chats.receiver",
            unreadCount: {
              $sum: 1,
            },
            lastMessage: {
              $last: "$chats.messages.message",
            }
          },
        },
      ])
      const populatedChats = await Chat.populate(chats, {
        path: "_id",
        select: "username profileImage",
      });
       const user = await User.findById({_id: senderId}).populate({
          path: "sender",
          select: "username prfileImage isOnline lastOnline",
        })
      socket.emit("recieve-all-chats", {user,populatedChats});
    });

    // get user specific chat information
    socket.on("get-user-chat", async ({ sender, receiver }) => {
      const chats = await Chat.find({ sender: sender });
      const rchat = chats.chats.find((c) => c.receiver == receiver);
      const result = {
        receiver: await User.findOne({ _id: rchat.receiver }).select(
          "username prfileImage isOnline lastOnline"
        ),
        messages: rchat.messages,
      };
      socket.emit("receive-user-chat", result);
    });

    // disconnect user
    socket.on("disconnect", async () => {
      let user = await User.findOne({ socketId: socket.id });
      if (user) {
        user.isOnline = false;
        user.lastOnline = Date.now();
        await user.save();
      }
      console.log("user " + socket.id + " is disconnected.");
    });
  }
};
