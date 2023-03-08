import React from "react";
import { useEffect, useState } from "react";
import PlayerDisplay from "../PlayerDisplay";
import "./main.css";
export default function Main() {
  const [dataSet, setDataSet] = useState([]);
  const [players, setPlayers] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(
        "https://api.npoint.io/20c1afef1661881ddc9c"
      );
      const result = await response.json();
      setDataSet(result);
      setPlayers(result.playerList);
      console.log(result);
    };
    fetchAPI();
  }, []);

  const handleSearch = (e) => {
    const item = e.target.value;
    const search_res = dataSet.playerList.filter((itm) => {
      return (
        itm.PFName?.toLowerCase().includes(item.toLowerCase()) ||
        itm.TName?.toLowerCase().includes(item.toLowerCase())
      );
    });
    setPlayers(search_res);
  };
  return (
    <div>
      <div className="Searchforplayer">
        <input
          type="text"
          placeholder="Search by Tname and PFname"
          className="playerInput"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <div className="playersdiv">
        {players.map((player) => (
          <PlayerDisplay
            player={player}
            className="players"
            key={player.Id}
          />
        ))}
      </div>
    </div>
  );
}
