import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchAlbums() {
      const res = await API.get("/albums");
      setAlbums(res.data.albums);
    }

    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Albums</h1>

      {albums.map((a) => (
        <div key={a._id}>
          <Link to={`/albums/${a._id}`}>{a.title}</Link>
        </div>
      ))}
    </div>
  );
}
