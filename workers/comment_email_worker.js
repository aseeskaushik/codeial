// comment_email_worker.js
const { parentPort, workerData } = require("worker_threads");
const commentsMailer = require("../mailers/comments_mailer");

// Ensure the comment object is populated with the user data
if (workerData && workerData.user) {
  // Perform email notification task
  commentsMailer.newComment(workerData);
}

// Send a message to the parent thread to indicate success
parentPort.postMessage({ success: true });
