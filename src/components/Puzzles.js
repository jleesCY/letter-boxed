import { NavLink } from "react-router-dom";
import "../css/layout.css"
import "../css/themes.css"

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
      </div>
    </div>
    </>
  );
}