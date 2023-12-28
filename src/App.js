import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Puzzles from "./components/Puzzles"
import Puzzle from "./components/Puzzle"
import MobileLanding from "./components/MobileLanding"
import NotFound from "./components/NotFound"
import GeneratePuzzle from './components/GeneratePuzzle';
import CryptoJS from 'crypto-js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/puzzles" ></Navigate>}></Route>
      <Route path="/puzzles">
          <Route index element={<Puzzles></Puzzles>}></Route>
          <Route path=":id" element={<Puzzle></Puzzle>}></Route>
      </Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
}

export default App;
