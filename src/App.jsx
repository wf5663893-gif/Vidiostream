
import { useMemo, useState, useEffect } from "react";
const TOTAL_VIDEOS = 200;
const PAGE_SIZE = 20;

const categories = [
  "Trending",
  "Anime",
  "Gaming",
  "18+",
];

const videos = Array.from({ length: TOTAL_VIDEOS }, (_, i) => ({
  id: i + 1,
  title: `Trending Video ${i + 1}`,
  channel: `Channel ${i + 1}`,
  views: `${(Math.random() * 900 + 100).toFixed(0)}K views`,
  duration: `${Math.floor(Math.random() * 20) + 1}:${Math.floor(
    Math.random() * 59
  )
    .toString()
    .padStart(2, "0")}`,
  thumbnail: `https://picsum.photos/seed/video${i}/800/500`,
  video: "https://www.w3schools.com/html/mov_bbb.mp4",
}));

export default function App() {
  useEffect(() => {
  const socialBar =
    document.createElement("script");

  socialBar.src =
    "https://consumptionbackwardsentiments.com/dd/d2/ff/ddd2fff18217927a098cff5bfe6b8ecc.js"

  socialBar.async = true;

  document.body.appendChild(
    socialBar
  );

  return () => {
    document.body.removeChild(
      socialBar
    );
  };
}, []);
  
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

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
  const socialScript =
    document.createElement("script");

  socialScript.src =

  socialScript.async = true;

  document.body.appendChild(
    socialScript
  );

  return () => {
    document.body.removeChild(
      socialScript
    );
  };
}, []);
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 20px",
          borderBottom: "1px solid #222",
          position: "sticky",
          top: 0,
          background: "#111",
          zIndex: 99,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "#e50914",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            V
          </div>

          <h2 style={{ margin: 0 }}>StreamFlix</h2>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search videos..."
          style={{
            width: "40%",
            padding: 12,
            borderRadius: 30,
            border: "none",
            outline: "none",
            background: "#1f1f1f",
            color: "white",
          }}
        />

        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#333",
          }}
        />
      </header>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 10,
          padding: 15,
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            style={{
              background: "#1f1f1f",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: 999,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
  style={{
    height: "100vh",
    overflowY: "auto",
    scrollSnapType: "y proximity",
    WebkitOverflowScrolling: "touch",
  }}
>
  {paginated.map((video) => (
    <div
      key={video.id}
      style={{
        minHeight: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        background: "black",
      }}
      onClick={() => setSelected(video)}
    >
      <video
        src={video.video}
        autoPlay
        muted
        loop
        playsInline
        controls
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 20,
          color: "white",
          zIndex: 2,
        }}
      >
        <h2>{video.title}</h2>

        <p>{video.channel}</p>

        <p>{video.views}</p>
      </div>
    </div>
  ))}
</div>
     
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: 1200,
              background: "#181818",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 15,
                borderBottom: "1px solid #222",
              }}
            >
              <h2 style={{ margin: 0 }}>{selected.title}</h2>

              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "#e50914",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Close
              </button>
            </div>

            <video
  src={selected.video}
  controls
  autoPlay
  muted
  loop
  playsInline
  style={{
    width: "100%",
    maxHeight: "80vh",
  }}
/>
<div
  style={{
    padding: 20,
    background: "#111",
  }}
>
  <h2
    style={{
      marginBottom: 20,
      fontSize: 22,
    }}
  >
    Recommended Videos
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fill,minmax(220px,1fr))",
      gap: 20,
    }}
  >
    {videos
      .slice(0, 8)
      .map((item) => (
        <div
          key={item.id}
          onClick={() =>
            setSelected(item)
          }
          style={{
            cursor: "pointer",
            background: "#181818",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <img
            src={item.thumbnail}
            style={{
              width: "100%",
              height: 140,
              objectFit: "cover",
            }}
          />

          <div
            style={{
              padding: 12,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 16,
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#aaa",
                marginTop: 8,
                fontSize: 14,
              }}
            >
              {item.channel}
            </p>

            <p
              style={{
                color: "#777",
                fontSize: 13,
              }}
            >
              {item.views}
            </p>
          </div>
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
