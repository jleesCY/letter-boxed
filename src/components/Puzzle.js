import "../css/layout.css"
import "../css/themes.css"
import { useParams } from 'react-router-dom'

export default function Puzzle() {
  const { id } = useParams();
  let data2x2 = "ABCDEFGH";
  let data3x3 = "ISUWTQARCDHE";
  let data4x4 = "ABCDEFGHIJKLMNOP";
  let d = {x: 3, y: 3}
  
  return(
  <>
    <div className="theme light">
      <div className="container" draggable="false">
        <div className="header">Puzzle {id}</div>
        <div className="body">
          <div className="puzzleBox">
            <div></div>
            <div className="top">
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[0]}</div>
              </div>
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[1]}</div>
              </div>
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[2]}</div>
              </div>
            </div>
            <div></div>
            <div className="left">
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[3]}</div>
              </div>
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[4]}</div>
              </div>
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[5]}</div>
              </div>
            </div>
            <div className="connectBox"></div>
            <div className="right">
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[6]}</div>
              </div>
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[7]}</div>
              </div>
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[8]}</div>
              </div>
            </div>
            <div></div>
            <div className="bottom">
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[9]}</div>
              </div>
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[10]}</div>
              </div>
              <div className="node">
                <div className="circle"></div>
                <div className="letter">{data3x3[11]}</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}