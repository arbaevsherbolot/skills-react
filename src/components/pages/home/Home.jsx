import React, { useState } from "react";
import axios from "axios";
import styles from "./Home.module.scss";

const Home = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState("");

  const messageHandle = (e) => {
    setMessage(e.target.value);
  };

  const server_url = "https://authorization.up.railway.app/messages";

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(server_url, {
        message,
      });

      const data = result.data;

      setReply(data.message);

      setInterval(() => {
        setReply("");
      }, 8000);

      setMessage("");
    } catch {
      setReplyError("Server is temporarily unavailable!");

      setInterval(() => {
        setReplyError("");
      }, 8000);
    }
  };

  return (
    <div className="page_wrapper">
      <form className={styles.form} onSubmit={sendMessage}>
        {reply ? <p className={styles.reply}>{reply}</p> : null}
        {replyError ? <p className={styles.reply_error}>{replyError}</p> : null}

        <textarea
          className={styles.textarea}
          type="text"
          value={message}
          placeholder="Type a question..."
          onChange={messageHandle}
          required></textarea>

        <button className={styles.btn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Home;
