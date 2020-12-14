import React, {useState, useEffect} from "react";
import Heading from "./Heading";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import axios from "axios";


function App() {

    const [notes, setNotes] = useState([]);

    function addNote(newNote){
        setNotes(prevNotes => {
           return [...prevNotes, newNote];
        });
    }

    useEffect(() => {
        axios.get("http://localhost:3000/notes/")
        .then (res => {
            setNotes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    });

    function deleteNote(id){
        axios.delete("http://localhost:3000/notes/${id}")
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    return (
      <div>
        <Heading />
        <CreateArea 
            onAdd={addNote}
        />
        {notes.map((noteItem, index) => {
            return (
                <Note 
                key = {index}
                _id = {noteItem._id}
                title = {noteItem.title}
                content = {noteItem.content}
                onDelete = {deleteNote}
            />
            );
        })}
        <Footer />
      </div>
    );
  }

export default App;