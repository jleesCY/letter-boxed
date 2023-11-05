import LetterNode from './LetterNode'

export default function PuzzleBox(props) {
  let top = [];
  let bottom = [];
  let left = [];
  let right = [];

  for (let i = 0; i < props.columns; i++) {
    top.push(<LetterNode key={props.letters[i]} letter={props.letters[i]}></LetterNode>);
    bottom.push(<LetterNode key={props.letters[i + props.columns + props.rows + props.rows]} letter={props.letters[i + props.columns + props.rows + props.rows]}></LetterNode>);
  }
  for (let i = 0; i < props.rows; i++) {
    left.push(<LetterNode key={props.letters[i + props.columns]} letter={props.letters[i + props.columns]}></LetterNode>);
    right.push(<LetterNode key={props.letters[i + props.columns + props.rows]} letter={props.letters[i + props.columns + props.rows]}></LetterNode>);
  }

  return(
    <div className="puzzleBox">
      <div></div>
      <div className="top">
        {top}
      </div>
      <div></div>
      <div className="left">
        {left}
      </div>
      <div className="connectBox"></div>
      <div className="right">
        {right}
      </div>
      <div></div>
      <div className="bottom">
        {bottom}
      </div>
      <div></div>
    </div>
  );
}