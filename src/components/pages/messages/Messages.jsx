import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Messages.module.scss";

const Messages = () => {
  const [data, setData] = useState([{}]);

  const server_url = "https://crud-server-api.up.railway.app/skills";

  useEffect(() => {
    const getSkills = async () => {
      try {
        const result = await axios.get(server_url);

        const data = result.data.message;

        setData(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getSkills();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server_url}/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="page_wrapper">
        {data ? (
          <div className={styles.skills_container}>
            {data.map((skill, i) => (
              <p className={styles.skill} key={i}>
                {skill.skill}
                <button
                  onClick={() => handleDelete(skill.id)}
                  className={styles.delete_btn}>
                  Delete
                </button>
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
