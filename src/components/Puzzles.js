import { NavLink } from "react-router-dom";
import "../css/layout.css"
import "../css/themes.css"
import words from "../assets/words-guessable.json"
import * as CryptoJS from "crypto-js";

export default function Puzzles() {
  return(
    <>
    <div className="theme light">
      <div className="container">
        <div className="header">
          <div></div>
          <div>Puzzles</div>
          <div></div>
        </div>
        <div className="body">
          <div className="main-page-buttons">
            <NavLink to="/puzzles/today">Today's</NavLink>
            <NavLink to="/puzzles/random">Random</NavLink>
          </div>
            <h3 style={{marginBottom: 0}}>Daily Puzzle Archive (coming soon)</h3>
          <table className="puzzle-list">
            <thead>
              <tr>
                <td>date</td>
                <td>link</td>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <div className="in-development">
            <h3>Features in development:</h3>
            <ul>
              <li>Mobile Support</li>
              <li>Color Themes</li>
              <li>Daily Puzzle Archive</li>
              <li>Custom Puzzle Builder</li>
              <li>Non-Square Puzzles</li>
            </ul>
          </div>
        </div>
        <div className="footer">
          <div>Version 0.3.0</div>
          <div>Dictionary: <strong>{words.length.toLocaleString('en-US')}</strong> words</div>
        </div>
      </div>
    </div>
    </>
  );
}