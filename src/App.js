import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Puzzles from "./components/Puzzles"
import Puzzle from "./components/Puzzle"
import NotFound from "./components/NotFound"
import { PythonProvider } from 'react-py';

function App() {
  return (
    <PythonProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/puzzles" ></Navigate>}></Route>
        <Route path="/puzzles">
            <Route index element={<Puzzles></Puzzles>}></Route>
            <Route path=":id" element={<Puzzle></Puzzle>}></Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  </PythonProvider>
  );
}

export default App;
