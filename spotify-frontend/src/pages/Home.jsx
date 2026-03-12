import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    async function fetchMusics() {
      const res = await API.get("/");
      setMusics(res.data.musics);
    }

    fetchMusics();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Musics</h1>

      {musics.map((m) => (
        <div key={m._id}>
          <h3>{m.title}</h3>
          <p>{m.artist.username}</p>

          <audio controls src={m.uri}></audio>
        </div>
      ))}
    </div>
  );
}