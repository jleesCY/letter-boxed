import "../css/layout.css"
import "../css/themes.css"
import { useParams } from 'react-router-dom'
import PuzzleBox from './PuzzleBox'
import GeneratePuzzle from "./GeneratePuzzle"
import words from "../assets/words-guessable.json"

let validLetterToType = (e, data) => {
  let char = e.target.value[e.target.value.length - 1].toUpperCase()
  let letterIdx = data.letters.indexOf(char)
  if (letterIdx == -1) {
    return false
  }
  if (e.target.value.length <= 1) {
    return true
  }
  if (e.target.value.length > 1) {
    if (Math.floor(letterIdx / 3) == Math.floor(data.letters.indexOf(e.target.value[e.target.value.length - 2]) / 3)) {
      return false
    }
    return true
  }
  return false
}

let renderLines = (letters) => {
  for (let node of document.querySelectorAll(".node")) {
    node.querySelector(".circle").setAttribute("style", "background-color: white")
    node.querySelector(".letter").setAttribute("style", "font-weight: none")
  }
  for (let i = 0; i < letters.length; i++) {
    if (i == letters.length - 1) {
      document.querySelector(`#${letters[i]} .letter`).setAttribute("style", "font-weight: bold")
      document.querySelector(`#${letters[i]} .circle`).setAttribute("style", "background-color: red")
    }
    else {
      document.querySelector(`#${letters[i]} .letter`).setAttribute("style", "font-weight: bold")
    }
    
  }
}

export default function Puzzle() {

  let letters = "";

  const { id } = useParams();
  let data = null;
  try {
    data = require(`../assets/puzzles/${id}.json`);
  }
  catch {
    if (id == "random") {
      data = GeneratePuzzle()
    }
    else {
      return(
        <>
        Puzzle '{id}' does not exist
        </>
      );
    }
  }
  
  return(
  <>
    <div className="theme light">
      <div className="container" draggable="false">
        <div className="header">{data.name}</div>
        <div className="body">
          <div className="words">
            <input className="active-word" onChange={(e) => {
              e.preventDefault()
              if (e.target.value != "") {
                if (!validLetterToType(e, data)) {
                  e.target.value = e.target.value.slice(0,e.target.value.length - 1)
                }
                // valid letter, so update stuff
                else if (e.key != 'Backspace'){
                  e.target.value = e.target.value.toUpperCase()
                  letters = letters + e.target.value[e.target.value.length - 1]
                }
              }
              renderLines(letters)
            }} onKeyDown={(e) => {
              if (e.key == 'Enter') {
                if (e.target.value.length < 3) {
                  console.log(`${e.target.value} is too short`)
                }
                else {
                  if (words.includes(e.target.value)) {
                    console.log(`${e.target.value} is a word`)
                  }
                  else {
                    console.log(`${e.target.value} is NOT a word`)
                  }
                }
              }
              if (e.key == 'Backspace') {
                letters = letters.slice(0, letters.length - 2)
              }
            }}/>
            <div className="past-words"></div>
          </div>
          <PuzzleBox letters={data.letters} rows={data.dimensions.rows} columns={data.dimensions.columns}></PuzzleBox>
        </div>
      </div>
    </div>
  </>
  );
}