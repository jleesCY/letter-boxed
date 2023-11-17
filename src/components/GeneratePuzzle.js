import words from "../assets/words.json"
import seedrandom from 'seedrandom';

function search(s, state, lastSideId) {
  count++;

  if (s.length === 0) {
    return state;
  }

  if (s[0] in state) {
    const posId = state[s[0]];
    const sideId = Math.floor(posId / 3);

    if (sideId === lastSideId) {
      return null;
    }

    return search(s.slice(1), { ...state }, sideId);
  }

  const blanks = new Set([...Array(12).keys()].filter((i) => !Object.values(state).includes(i)));
  const blanksArray = Array.from(blanks);

  for (let i = 0; i < blanksArray.length; i++) {
    const posId = blanksArray[i];
    const sideId = Math.floor(posId / 3);

    if (sideId === lastSideId) {
      continue;
    }

    const lettersOnSide = Object.keys(state).filter((k) => Math.floor(state[k] / 3) === sideId);

    if (lettersOnSide.length === 3) {
      continue;
    }

    const newState = { ...state };
    newState[s[0]] = posId;
    const finalState = search(s.slice(1), newState, sideId);

    if (finalState !== null) {
      return finalState;
    }
  }

  return null;
}

function sample(seed) {
  const w1list = shuffleArray([...words], seed);
  const w2list = shuffleArray([...words], [...seed].reverse().join(""));

  for (const w1 of w1list) {
    for (const w2 of w2list) {
      if (w1.charAt(w1.length - 1) !== w2.charAt(0)) {
        continue;
      }

      if (new Set(w1 + w2).size !== 12) {
        continue;
      }

      const posId = Math.floor(Math.random() * 12);
      const sideId = Math.floor(posId / 3);
      const sideAssignments = search(w1.slice(1) + w2.slice(1), { [w1.charAt(0)]: posId }, sideId);

      if (sideAssignments !== null) {
        return [w1, w2, sideAssignments];
      }
    }
  }
}

function createRandomGenerator(seed){
  const a = 5486230734;  // some big numbers
  const b = 6908969830; 
  const m = 9853205067;
  var x = seed;
  // returns a random value 0 <= num < 1
  return function(seed = x){  // seed is optional. If supplied sets a new seed
    x = (seed  * a + b) % m;
    return x / m;
  }
}

function stringTo32BitHash(str){
  var v = 0;
  for(var i = 0; i < str.length; i += 1){
    v += str.charCodeAt(i) << (i % 24);
  }
  return v % 0xFFFFFFFF;
}

function shuffleArray(arr,str){
  var rArr = [];
  var random = createRandomGenerator(stringTo32BitHash(str));        
  while(arr.length > 1){
    rArr.push(arr.splice(Math.floor(random() * arr.length), 1)[0]);
  }
  rArr.push(arr[0]);
  return rArr;
}

let count = 0; 

export default function GeneratePuzzle(name, seed) {
  const [w1, w2, sideAssignments] = sample(seed);

  return({
    name: name,
    solution: w1.toUpperCase() + "-" + w2.toUpperCase(), 
    letters: Object.entries(sideAssignments).sort((a, b) => a[1] - b[1]).map(item => item[0].toUpperCase()).join(''),
    dimensions: {
      rows: 3,
      columns: 3
    }
  });
}