import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Home.module.scss";

const Home = () => {
  const [skill, setSkill] = useState("");
  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState("");

  const skillHandle = (e) => {
    setSkill(e.target.value);
  };

  const server_url = "https://authorization.up.railway.app/skills";

  const sendSkillToServer = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(server_url, {
        skill,
      });

      const data = result.data;

      setReply(data.message);

      setInterval(() => {
        setReply("");
      }, 8000);

      setSkill("");
    } catch {
      setReplyError("Server is temporarily unavailable!");

      setInterval(() => {
        setReplyError("");
      }, 8000);
    }
  };

  return (
    <div className="page_wrapper">
      <form className={styles.form} onSubmit={sendSkillToServer}>
        {reply ? <p className={styles.reply}>{reply}</p> : null}
        {replyError ? <p className={styles.reply_error}>{replyError}</p> : null}

        <textarea
          className={styles.textarea}
          type="text"
          value={skill}
          placeholder="Type a new skill..."
          onChange={skillHandle}
          required></textarea>

        <button className={styles.btn} type="submit">
          Add
        </button>

        <Link className={styles.link} to="/skills">
          See all skills
        </Link>
      </form>
    </div>
  );
};

export default Home;
