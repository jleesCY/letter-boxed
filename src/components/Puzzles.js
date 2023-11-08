import { NavLink } from "react-router-dom";
import "../css/layout.css"
import "../css/themes.css"
import words from "../assets/words-guessable.json"

export default function Puzzles() {
  return(
    <>
    <div className="theme light">
      <div className="container">
        <div className="header">PUZZLES</div>
        <div className="body">
          <div className="main-page-buttons">
            <NavLink to="" style={{textDecoration: "line-through"}}>Today's Puzzle</NavLink>
            <NavLink to="/puzzles/random">Random Puzzle</NavLink>
          </div>
            <h3 style={{marginBottom: 0}}>Daily Puzzle Archive (coming soon)</h3>
          <table className="puzzle-list">
            <thead>
              <tr>
                <td>name</td>
                <td>date</td>
                <td>link</td>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        <div className="footer">
          <div>Version 0.2</div>
          <div>Dictionary: <strong>{words.length.toLocaleString('en-US')}</strong> words</div>
        </div>
      </div>
    </div>
    </>
  );
}