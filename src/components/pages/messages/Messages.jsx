import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Messages.module.scss";

const Messages = () => {
  const [data, setData] = useState([{}]);

  const server_url = "https://authorization.up.railway.app/messages";

  useEffect(() => {
    async function getMessages() {
      const result = await axios.get(server_url);

      const data = result.data.message;

      setData(data);
    }

    getMessages();
  }, []);

  return (
    <>
      <div className="page_wrapper">
        {data ? (
          <div className={styles.messages_container}>
            {data.map((message, i) => (
              <p className={styles.message} key={i}>
                {message.message}
              </p>
            ))}

            <Link className={styles.link} to="/">
              Add new skill
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Messages;
