// import notificationModel from "../models/notificationModel.js";
// import { io, onlineUsers } from "../app.js";

// export const sendNotification = async (receiverId, message, data = {}) => {
//     try {
//         // Save notification to DB
//         const notification = new notificationModel({
//             userId: receiverId,
//             message,
//             data,
//             isRead: false
//         });

//         await notification.save();

//         // Real-time notification using socket.io
//         const socketId = onlineUsers.get(receiverId.toString());

//         if (socketId) {
//             io.to(socketId).emit("notification", notification);
//             console.log("Notification sent to:", receiverId);
//         } else {
//             console.log("User offline, only saved:", receiverId);
//         }

//         return notification;
//     } catch (error) {
//         console.log("Notification error:", error);
//     }
// };
import admin from "@/lib/firebaseAdmin";

export const sendNotification = async (token, title, body) => {
  try {
    await admin.messaging().send({
      token,
      notification: {
        title,
        body
      }
    });
    console.log("Notification sent!");
  } catch (err) {
    console.error("FCM Error:", err);
  }
}
