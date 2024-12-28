import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Takenote.css'
import { Storecontext } from '../../context/Storecontext';
const Takenote = ({url}) => {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const {type} = useContext(Storecontext)

    const fetchNotes = async () => {
        const response = await axios.get(url+'/api/note/get');
        setNotes(response.data.data);
    };

    const addNote = async () => {
        if (!newNote.trim()) return;
        const response = await axios.post(url+'/api/note/add', { text: newNote ,});
        setNotes([...notes, response.data.data]);
        setNewNote("");
    };

    const toggleCompleted = async (id,completed) =>{
        const response = await axios.put(url+`/api/note/update`,{id,completed})
        setNotes(notes.map((note)=>(note._id===id ?response.data.data:note)))
    }

    const deletenote = async (id)=>{
      try {
        const response = await axios.delete(url + "/api/note/delete", {
          params: { id },
        });
        await fetchNotes()
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi xóa ghi chú:", error);
      }
    }

    useEffect(()=>{
        fetchNotes()
    },[])
  return (
    <div className='takenote'>
      <h1>Quản lý mục tiêu nhỏ</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Thêm ghi chú..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          style={{ padding: "10px", width: "70%" }}
        />
        <button onClick={addNote} style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Thêm
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <span>
              <input
                type="checkbox"
                checked={note.checkbox}
                onChange={() => toggleCompleted(note._id,!note.checkbox)}
                style={{ marginRight: "10px" }}
              />
              {note.text}
            </span>
            {type==="Admin"?(
              <button onClick={()=>deletenote(note._id)} style={{ padding: "5px 10px" }}>
              Xóa
            </button>
            ):<></>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Takenote