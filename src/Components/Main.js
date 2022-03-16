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
                <Card.Text>Skill: {item.SkillDesc}</Card.Text>
                <Card.Text>Players Value: {item.Value}</Card.Text>
                <Card.Text>
                  Up-Coming Match List:{" "}
                  {item.UpComingMatchesList.map((match) => {
                    return (
                      <>
                        {match.CCode === "" || match.VsCode === ""
                          ? "No Matches"
                          : `${match.CCode} v/s ${match.VsCCode}`}
                        <Card.Text>
                          Time: {match.MDate === "" ? "NA" : `${match.MDate}`}
                        </Card.Text>
                      </>
                    );
                  })}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Main;
