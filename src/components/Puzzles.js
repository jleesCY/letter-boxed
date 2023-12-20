import { NavLink } from "react-router-dom";
import "../css/layout.css"
import "../css/themes.css"
//import words from "../assets/words-guessable.json"
//import * as CryptoJS from "crypto-js";
import Version from "./Version";
import Streak /*, { UpdateStreakNum }*/ from "./Streak";
import GetTheme, { ToggleTheme } from "./Themes";

export default function Puzzles() {
  //UpdateStreakNum()
  return(
    <>
    <div id="theme-container" className={"theme " + GetTheme()}>
      <div className="container">
        <div className="header">
          <div></div>
          <div>Boxed Letters</div>
          <div></div>
        </div>
        <div className="body">
          <p style={{textDecoration: "line-through"}}>Current daily streak: {Streak()} days</p>
          <div className="main-page-buttons">
            <NavLink to="/puzzles/today">Today's Puzzle</NavLink>
            <NavLink to="/puzzles/random">Random Puzzle</NavLink>
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
          <div>Version {Version()}</div>
          <p className="toggle-theme" onClick={() => {
            ToggleTheme()
            document.getElementById("theme-container").classList.remove("light")
            document.getElementById("theme-container").classList.remove("dark")
            document.getElementById("theme-container").classList.add(GetTheme())
            }}
          >Toggle Theme</p>
        </div>
      </div>
    </div>
    </>
  );
}