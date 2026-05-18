import { useState } from 'react'

export default function App() {
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  const addComment = () => {
    if (!text) return
    setComments([...comments, text])
    setText('')
  }

  return (
    <div style={{ padding: 20, background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>VideoStream Ready Deploy</h1>

      <video
        width="400"
        controls
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setLikes(likes + 1)}>
          Like ({likes})
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="comment..."
        />
        <button onClick={addComment}>Send</button>

        {comments.map((c, i) => (
          <p key={i}>{c}</p>
        ))}
      </div>
    </div>
  )
}
