import React, {useState, useEffect} from 'react';
import {Button, InputLabel, Input} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Message from './Message';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    const name = prompt("Enter name");
    setUsername(name);
  }, [])

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id:doc.id, message:doc.data()})))
    })
  }, [])

  const sendMessage = (event) => {
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setInput("");
    event.preventDefault();
  }
  
  return (
    <div className="App">
      <img className="logo" src="https://scontent-del1-1.xx.fbcdn.net/v/t39.8562-6/37789948_1959933824027454_666414594595487744_n.png?_nc_cat=1&amp;_nc_sid=6825c5&amp;_nc_ohc=Gq40jI-kFygAX-siOcM&amp;_nc_ht=scontent-del1-1.xx&amp;oh=aa415ae885d7d02d42e535160572929c&amp;oe=5FA7C933" alt="Messenger"></img>
      <h2>Welcome {username}</h2>
      <form className="app_form">
      <FormControl className="app_formcontrol">
      <Input className="app_input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)}/>
      <IconButton className="app_iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
        <SendIcon />
      </IconButton>
      </FormControl>
      </form>

      <FlipMove>
      {
        messages.map(({id, message}) => {
          return(<Message key={id} username={username} message={message}/>);
        })
      }
      </FlipMove>
    </div>
  );
}

export default App;
