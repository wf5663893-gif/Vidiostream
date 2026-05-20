import { useMemo, useState, useEffect } from "react";
import { db } from "./firebase";

import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const TOTAL_VIDEOS = 50;
const PAGE_SIZE = 12;

const videos = Array.from({ length: TOTAL_VIDEOS }, (_, i) => ({
  id: i + 1,
  title: `Trending Video ${i + 1}`,
  channel: `Channel ${i + 1}`,
  views: `${(Math.random() * 900 + 100).toFixed(0)}K views`,
  thumbnail: `https://picsum.photos/seed/video${i}/800/500`,
  video: "https://www.w3schools.com/html/mov_bbb.mp4",
}));

export default function App() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const socialBar = document.createElement("script");

    socialBar.src =
      "https://consumptionbackwardsentiments.com/dd/d2/ff/ddd2fff18217927a098cff5bfe6b8ecc.js";

    socialBar.async = true;

    document.body.appendChild(socialBar);

    return () => {
      document.body.removeChild(socialBar);
    };
  }, []);

  const filtered = useMemo(() => {
    return videos.filter((v) =>
      v.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  useEffect(() => {
    if (!selected) return;

    const unsub = onSnapshot(
      collection(db, "comments"),
      (snap) => {
        const list = [];

        snap.forEach((d) => {
          const data = d.data();

          if (data.videoId === selected.id) {
            list.push(data);
          }
        });

        setComments(list);
      }
    );

    return () => unsub();
  }, [selected]);

  useEffect(() => {
    if (!selected) return;

    const unsub = onSnapshot(
      doc(db, "likes", String(selected.id)),
      (snap) => {
        if (snap.exists()) {
          setLikes(snap.data());
        } else {
          setLikes({ count: 0 });
        }
      }
    );

    return () => unsub();
  }, [selected]);

  return (
    <div
      style={{
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <header
        style={{
          padding: 20,
          background: "#111",
          position: "sticky",
          top: 0,
          zIndex: 99,
        }}
      >
        <h2>StreamFlix</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search videos..."
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            marginTop: 10,
          }}
        />
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(250px,1fr))",
          gap: 20,
          padding: 20,
        }}
      >
        {paginated.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelected(video)}
            style={{
              background: "#181818",
              borderRadius: 16,
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              src={video.thumbnail}
              alt=""
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
              }}
            />

            <div style={{ padding: 14 }}>
              <h3>{video.title}</h3>
              <p>{video.channel}</p>
              <p>{video.views}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          paddingBottom: 40,
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              padding: 12,
              border: "none",
              borderRadius: 10,
              background:
                page === i + 1 ? "#ffcc00" : "#222",
              color:
                page === i + 1 ? "black" : "white",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            overflowY: "auto",
            zIndex: 999,
            padding: 20,
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              background: "#181818",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <h2>{selected.title}</h2>

              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "red",
                  border: "none",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                Close
              </button>
            </div>

            <video
              src={selected.video}
              controls
              autoPlay
              style={{
                width: "100%",
              }}
            />

            <div style={{ padding: 20 }}>
              <button
                onClick={async () => {
                  const ref = doc(
                    db,
                    "likes",
                    String(selected.id)
                  );

                  await setDoc(
                    ref,
                    {
                      count: (likes.count || 0) + 1,
                    },
                    { merge: true }
                  );
                }}
                style={{
                  background: "#ff0050",
                  border: "none",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: 999,
                }}
              >
                ❤️ {likes.count || 0}
              </button>

              <div style={{ marginTop: 30 }}>
                <h3>Comments</h3>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  <input
                    value={newComment}
                    onChange={(e) =>
                      setNewComment(e.target.value)
                    }
                    placeholder="Write comment..."
                    style={{
                      flex: 1,
                      padding: 12,
                      borderRadius: 10,
                      border: "none",
                    }}
                  />

                  <button
                    onClick={async () => {
                      if (!newComment) return;

                      await addDoc(
                        collection(db, "comments"),
                        {
                          videoId: selected.id,
                          text: newComment,
                          createdAt: serverTimestamp(),
                        }
                      );

                      setNewComment("");
                    }}
                    style={{
                      background: "#e50914",
                      border: "none",
                      color: "white",
                      padding: "12px 20px",
                      borderRadius: 10,
                    }}
                  >
                    Send
                  </button>
                </div>

                {comments.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#222",
                      padding: 12,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  >
                    {c.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
