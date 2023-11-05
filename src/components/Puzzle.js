import "../css/layout.css"
import "../css/themes.css"
import { useParams } from 'react-router-dom'
import PuzzleBox from './PuzzleBox'
import GeneratePuzzle from "./GeneratePuzzle"
import { useState } from "react"
import words from "../assets/words.json"

let validLetterToType = (e, data) => {
  let char = e.target.value[e.target.value.length - 1].toUpperCase()
  let letterIdx = data.letters.indexOf(char)
  if (letterIdx != -1 && e.target.value.length <= 1) {
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

export default function Puzzle() {

  const [letterToStart, setLetterToStart] = useState("")

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
            <input className="active-word" defaultValue={letterToStart} onChange={(e) => {
              if (e.target.value != "") {
                if (!validLetterToType(e, data)) {
                  e.target.value = e.target.value.slice(0,e.target.value.length - 1)
                }
                // valid letter, so update stuff
                else {
                  e.target.value = e.target.value.toUpperCase()





                }
              }
            }} onKeyDown={(e) => {
              if (e.key == 'Enter') {
                if (words.includes(e.target.value)) {
                  console.log(`${e.target.value} is a word`)
                }
                else {
                  console.log(`${e.target.value} is NOT a word`)
                }
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