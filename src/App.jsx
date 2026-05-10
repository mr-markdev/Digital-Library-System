import { useState } from "react";
import Dashboard from "./Admin/Dashboard.jsx";
import Library from "./Admin/Library.jsx";
import Updates from "./Admin/Updates.jsx";
import BorrowersList from "./Admin/BorrowersList.jsx";
import AddNewBook from "./Admin/AddNewBook.jsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/library" element={<Library />}></Route>
      <Route path="/updates" element={<Updates />}></Route>
      <Route path="/borrowers" element={<BorrowersList />}></Route>
      <Route path="/addnewbook" element={<AddNewBook />}></Route>
    </Routes>
  );
}

export default App;
