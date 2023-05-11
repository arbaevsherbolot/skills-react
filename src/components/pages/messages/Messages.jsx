import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Messages.module.scss";

const Messages = () => {
  const [data, setData] = useState([{}]);

  const [skillID, setSkillID] = useState(0);

  const server_url = "https://authorization.up.railway.app/skills";

  useEffect(() => {
    async function getSkills() {
      const result = await axios.get(server_url);

      const data = result.data.message;

      setData(data);
    }

    getSkills();
  }, []);

  const deleteSkill = () => {

    console.log(skillID);
  };

  return (
    <>
      <div className="page_wrapper">
        {data ? (
          <div className={styles.skills_container}>
            {data.map((skill, i) => (
              <p className={styles.skill} key={i}>
                {skill.id}. {skill.message}
                <span onClick={deleteSkill} className={styles.delete}></span>
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
