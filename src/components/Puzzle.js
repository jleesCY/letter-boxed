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
import Version from "./Version"
import GetTheme, { ToggleTheme } from "./Themes"
import { isMobile } from "react-device-detect"

let letters = "";
let typedWords = [];
let currWord = 0;
let data = null;

let validLetterToType = (char, data, lettersTyped) => {
  let letterIdx = data.letters.indexOf(char)
  if (letterIdx === -1) {
    return false
  }
  if (lettersTyped.length === 0) {
    return true
  }
  if (Math.floor(letterIdx / 3) === Math.floor(data.letters.indexOf(lettersTyped.slice(-1)) / 3)) {
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
    if (i === letters.length - 1) {
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

let handleClick = (e) => {
  handleKey(e.target.id);
}

let handleEnter = () => {
  let target = document.querySelector("#letter-input-box");
  if (target.value.length < 3) {
    target.classList.add("shake")
    setTimeout(() => {
      target.classList.remove("shake")
    }, 150)
    
  }
  else {
    if (words.includes(target.value)) {
      typedWords.push(target.value);
      currWord += 1;
      target.value = typedWords[currWord - 1][typedWords[currWord - 1].length - 1]
      document.querySelector(".past-words").innerHTML = typedWords.join("-");
      document.querySelector(".puzzleBox").classList.add("press-in");
      document.querySelector(".active-word").classList.add("pull-out");
      setTimeout(() => {
        document.querySelector(".puzzleBox").classList.remove("press-in")
        document.querySelector(".active-word").classList.remove("pull-out");
      }, 300)
      if (isSolved(letters, data.letters)) {
        document.querySelector("#popup").classList.remove("disabled");
        document.querySelector("#popup").children[2].innerHTML = data.solution
        document.querySelector("#popup").classList.add("enabled");
      }
    }
    else {
      target.classList.add("shake")
      setTimeout(() => {
      target.classList.remove("shake")
      }, 150)
    }
  }
  renderLines(letters)
}

let handleBackspace = () => {
  let target = document.querySelector("#letter-input-box");
  if (target.value.length === 1 && currWord > 0) {
    currWord -= 1
    target.value = typedWords[currWord]
    typedWords.pop(currWord)
    document.querySelector(".past-words").innerHTML = typedWords.join("-");
  }
  else {
    target.value = target.value.slice(0, -1)
    letters = letters.slice(0,-1)
  }
  renderLines(letters)
}

let handleKey = (key) => {
  let target = document.querySelector("#letter-input-box");
  if (validLetterToType(key, data, letters)) {
    target.value += key
    letters = letters + target.value.slice(-1)
  }
  renderLines(letters)
}

export default function Puzzle() {

  const { id } = useParams();
  if (id === "random") {
    data = GeneratePuzzle("Random Puzzle", Math.random().toString())
  }
  else if (id === "today") {
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
      <div className={"theme " + GetTheme()}>
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
    <div id="theme-container" className={"theme " + GetTheme()}>
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
            <input id="letter-input-box" autoFocus={true} className="active-word" disabled={isMobile} onKeyDown={(e) => {
              e.preventDefault()
              let key = e.key.toUpperCase()
              if (key === 'ENTER') {
                handleEnter();
              }
              else if (key === 'BACKSPACE') {
                handleBackspace();
              }
              else {
                handleKey(key);
              }
            }}/>
            <div className="past-words"></div>
          </div>
          <PuzzleBox letters={data.letters} rows={data.dimensions.rows} columns={data.dimensions.columns} handleClick={handleClick}></PuzzleBox>
          <div className="lower-buttons">
            <div className="upper-half">
              <button className="delete-button" onClick={() => {handleBackspace()}}>Delete</button>
              <button className="enter-button" onClick={() => {handleEnter()}}>Enter</button>
            </div>
            <div className="lower-half">
              <button className="share-button" onClick={(e) => {
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
        </div>
        <div className="footer">
          <p className="help-button" onClick={(e) => {
            document.getElementById("help-popup").classList.remove("disabled")
            document.getElementById("help-popup").classList.add("enabled")
          }}>Help</p>
          <p className="toggle-theme" onClick={() => {
            ToggleTheme()
            document.getElementById("theme-container").classList.remove("light")
            document.getElementById("theme-container").classList.remove("dark")
            document.getElementById("theme-container").classList.add(GetTheme())
            }}
          >Toggle Theme</p>
        </div>
        <div id="popup" className="disabled">
          <h3>You Won!</h3>
          <p>The two-word solution was:</p>
          <p></p>
          <button onClick={(e) => {
            e.target.parentElement.classList.remove("enabled")
            e.target.parentElement.classList.add("disabled")
          }}>Close</button>
        </div>
        <div id="help-popup" className="disabled">
          <h3 style={{paddingLeft: 10}}>How To Play Boxed Letters</h3>
          <p style={{paddingLeft: 20}}>Your goal is simple: to connect all side letters together using a series of connected words.</p>
          <p style={{paddingLeft: 20}}>Words you enter must be valid. Criteria for a "valid" entry as as follows:</p>
          <p style={{paddingLeft: 20}}></p>
          <p></p>
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