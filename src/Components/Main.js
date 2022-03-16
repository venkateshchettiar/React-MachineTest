import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import styles from "./Main.module.css";

const Main = () => {
  const [imageData, setImageData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://api.npoint.io/20c1afef1661881ddc9c").then((response) => {
      setImageData(response.data.playerList);
    });
  }, []);

  return (
    <div>
      <div align="center">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className=" form-control w-25 mt-5 mb-5"
          id={styles.search}
        />
      </div>
      <div id={styles.container}>
        {imageData
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (
              val.PFName.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            } else if (val.TName.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })
          .map((item) => (
            <Card id={styles.card}>
              <Card.Img variant="top" src={`player-images/${item.Id}.jpg`} />
              <Card.Body style={{ textAlign: "left" }}>
                <Card.Title>Full Name: {item.PFName}</Card.Title>
                <h3>Skill: {item.SkillDesc}</h3>
                <h3>Players Value: {item.Value}</h3>
                <h3>
                  Up-Coming Match List:{" "}
                  {item.UpComingMatchesList.map((match) => {
                    return (
                      <>
                        {match.CCode === "" || match.VsCode === ""
                          ? "No Matches"
                          : `${match.CCode} v/s ${match.VsCCode}`}
                        <h3>
                          Time: {match.MDate === "" ? "NA" : `${match.MDate}`}
                        </h3>
                      </>
                    );
                  })}
                </h3>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Main;
