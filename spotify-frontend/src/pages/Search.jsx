import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

export default function Search() {
  const [musics, setMusics] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchMusics() {
      const res = await API.get("/");
      setMusics(res.data.musics || []);
    }

    fetchMusics();
  }, []);

  function handlePlay(musicId) {
    API.post(`/play/${musicId}`).catch((err) => {
      console.log("Failed to record play", err);
    });

    setMusics((prev) =>
      prev.map((m) =>
        m._id === musicId ? { ...m, playCount: (m.playCount || 0) + 1 } : m
      )
    );
  }

  const filtered = useMemo(() => { // helping to search songs.
    const q = query.trim().toLowerCase();
    if (!q) return musics;
    return musics.filter((m) => {
      const title = m.title?.toLowerCase() || "";
      const artist = m.artist?.username?.toLowerCase() || "";
      return title.includes(q) || artist.includes(q);
    });
  }, [musics, query]);

  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        overflowY: "auto",
        background: "#121212",
        color: "white",
        padding: "24px",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "16px" }}>
        Search
      </h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for songs or artists"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "10px 14px",
            borderRadius: "999px",
            border: "none",
            outline: "none",
            background: "#202020",
            color: "white",
            fontSize: "14px",
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <p style={{ fontSize: "14px", color: "#b3b3b3" }}>
          No results found.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          {filtered.map((m) => (
            <div
              key={m._id}
              style={{
                background: "#181818",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  borderRadius: "6px",
                  backgroundImage: m.coverUri
                    ? `url(${m.coverUri})`
                    : "linear-gradient(135deg, #3b82f6, #1db954, #9333ea)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: "10px",
                }}
              />
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                {m.title}
              </div>
              <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
                {m.artist?.username || "Unknown artist"}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#b3b3b3",
                  marginTop: "2px",
                  marginBottom: "4px",
                }}
              >
                Plays: {m.playCount || 0}
              </div>
              <audio
                controls
                src={m.uri}
                onPlay={() => handlePlay(m._id)}
                style={{
                  width: "100%",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

