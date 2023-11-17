import "../css/layout.css"
import "../css/themes.css"
import { useParams } from 'react-router-dom'
import PuzzleBox from './PuzzleBox'
import GeneratePuzzle from "./GeneratePuzzle"
import words from "../assets/words-guessable.json"
import Xarrow from "react-xarrows"
import { createRoot } from 'react-dom/client';
import * as CryptoJS from "crypto-js"
import { NavLink } from "react-router-dom"

let validLetterToType = (char, e, data, lettersTyped) => {
  let letterIdx = data.letters.indexOf(char)
  if (letterIdx == -1) {
    return false
  }
  if (lettersTyped.length == 0) {
    return true
  }
  if (Math.floor(letterIdx / 3) == Math.floor(data.letters.indexOf(lettersTyped.slice(-1)) / 3)) {
    return false
  }
  else {
    return true
  }
}

let isSolved = (goal, actual) => {
 for(var i = 0; i < actual.length; i++){
   if(goal.indexOf(actual.charAt(i)) === -1) { return false; }
 }
 return true;
}

let renderLines = (letters) => {
  for (let node of document.querySelectorAll(".node")) {
    node.classList.remove("past")
    node.classList.remove("active")
  }
  for (let line of document.querySelectorAll(".line")) {
    line.remove()
  }
  for (let i = 0; i < letters.length; i++) {
    if (i == letters.length - 1) {
      document.querySelector(`#${letters[i]}`).parentElement.classList.remove("past")
      document.querySelector(`#${letters[i]}`).parentElement.classList.add("active")
    }
    else {
      document.querySelector(`#${letters[i]}`).parentElement.classList.remove("active")
      document.querySelector(`#${letters[i]}`).parentElement.classList.add("past")
    }
  }
  for (let i = letters.length - 1; i > 0; i--) {
    let elem = document.createElement("div")
    elem.setAttribute("class", "line")
    document.querySelector(".puzzleBox").appendChild(elem)
    let line = createRoot(elem)
    line.render(<Xarrow start={letters[i]} end={letters[i - 1]} lineColor="#D9C0FF" showHead={false} startAnchor="middle" endAnchor="middle" curveness={0} dashness={true}></Xarrow>)
  }
}

export default function Puzzle() {

  let letters = "";
  let typedWords = [];
  let currWord = 0;

  const { id } = useParams();
  let data = null;
  if (id == "random") {
    data = GeneratePuzzle("Random Puzzle", Math.random().toString())
  }
  else if (id == "today") {
    var date = new Date(Date.now())
    var dateStr = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear()
    var seed = CryptoJS.MD5(dateStr).toString()
    data = GeneratePuzzle(dateStr, seed)
  }
  else if (id.startsWith("share=")) {
    let recv = CryptoJS.enc.Base64.parse(decodeURIComponent(id.split("=")[1])).toString(CryptoJS.enc.Utf8)
    data = JSON.parse(recv)
  }
  else if (id.startsWith("archive=")) {
    let recv = CryptoJS.enc.Base64.parse(decodeURIComponent(id.split("=")[1])).toString(CryptoJS.enc.Utf8)
    data = GeneratePuzzle(recv, CryptoJS.MD5(recv).toString())
  }
  else {
    return(
      <>
      <div className="theme light">
        <div className="container">
          <div className="header">oops...</div>
          <div className="body">
            <h2>No puzzle named "{id}"</h2>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  return(
  <>
    <div className="theme light">
      <div className="container" draggable="false">
        <div className="header">
          <NavLink to="/puzzles">&#60;</NavLink>
          <div>{data.name}</div>
          <NavLink onClick={(e) => {
            e.preventDefault()
            window.location.reload()
          }}>↻</NavLink>
        </div>
        <div className="body">
          <div className="words">
            <input className="active-word" onKeyDown={(e) => {
              e.preventDefault()
              let key = e.key.toUpperCase()
              if (key == 'ENTER') {
                if (e.target.value.length < 3) {
                  e.target.classList.add("shake")
                  setTimeout(() => {
                    e.target.classList.remove("shake")
                  }, 150)
                  
                }
                else {
                  if (words.includes(e.target.value)) {
                    typedWords.push(e.target.value);
                    currWord += 1;
                    e.target.value = typedWords[currWord - 1][typedWords[currWord - 1].length - 1]
                    document.querySelector(".past-words").innerHTML = typedWords.join("-");
                    document.querySelector(".puzzleBox").classList.add("press-in");
                    document.querySelector(".active-word").classList.add("pull-out");
                    setTimeout(() => {
                      document.querySelector(".puzzleBox").classList.remove("press-in")
                      document.querySelector(".active-word").classList.remove("pull-out");
                    }, 300)
                    if (isSolved(letters, data.letters)) {
                      document.querySelector("#popup").classList.remove("disabled");
                      document.querySelector("#popup").classList.add("enabled");
                    }
                  }
                  else {
                    e.target.classList.add("shake")
                    setTimeout(() => {
                    e.target.classList.remove("shake")
                    }, 150)
                  }
                }
              }
              else if (key == 'BACKSPACE') {
                if (e.target.value.length == 1 && currWord > 0) {
                  currWord -= 1
                  e.target.value = typedWords[currWord]
                  typedWords.pop(currWord)
                  document.querySelector(".past-words").innerHTML = typedWords.join("-");
                }
                else {
                  e.target.value = e.target.value.slice(0, -1)
                  letters = letters.slice(0,-1)
                }
              }
              else {
                if (validLetterToType(key, e, data, letters)) {
                  e.target.value += key
                  letters = letters + e.target.value.slice(-1)
                }
              }
              renderLines(letters)
            }}/>
            <div className="past-words"></div>
          </div>
          <PuzzleBox letters={data.letters} rows={data.dimensions.rows} columns={data.dimensions.columns}></PuzzleBox>
          <div className="lower-buttons">
            <button onClick={(e) => {
              try {
                let enc = encodeURIComponent(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(data))))
                navigator.clipboard.writeText(document.location.origin + '/puzzles/share=' + enc);
                e.target.innerHTML = "copied to clipboard"
              }
              catch {
                e.target.innerHTML = "error"
              }
            }}>Share Puzzle</button>
          </div>
        </div>
        <div className="footer">
          <div>Version 0.3.0</div>
          <div>Dictionary: <strong>{words.length.toLocaleString('en-US')}</strong> words</div>
        </div>
        <div id="popup" className="disabled">
          <h3>You Won!</h3>
          <p>The two-word solution was:</p>
          <p><strong>{data.solution}</strong></p>
          <button onClick={(e) => {
            e.target.parentElement.classList.remove("enabled")
            e.target.parentElement.classList.add("disabled")
          }}>Close</button>
          </div>
          
      </div>
    </div>
  </>
  );
}