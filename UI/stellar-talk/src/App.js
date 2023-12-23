import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chat from "./Pages/Chat";
import SetAvatar from "./Pages/SetAvatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/avatar" element={<SetAvatar/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
