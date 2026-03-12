import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function AlbumDetails() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    async function fetchAlbum() {
      const res = await API.get(`/albums/${id}`);
      setAlbum(res.data.album);
    }

    fetchAlbum();
  }, [id]);

  if (!album) return <p>Loading...</p>;

  return (
    <div>
      <h2>{album.title}</h2>

      {album.musics.map((m) => (
        <div key={m._id}>
          <p>{m.title}</p>
          <audio controls src={m.uri}></audio>
        </div>
      ))}
    </div>
  );
}