export default function LetterNode(props) {
  return (
    <div className="node">
      <div className="circle" id={props.letter} onClick={(e) => {props.handleClick(e)}}></div>
      <div className="letter">{props.letter}</div>
    </div>
  );
}