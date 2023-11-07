export default function LetterNode(props) {
  return (
    <div className="node" id={props.letter}>
      <div className="circle"></div>
      <div className="letter">{props.letter}</div>
    </div>
  );
}