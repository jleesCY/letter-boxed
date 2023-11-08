import words from "../assets/words.json"

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

function sample(words, verbose) {
  const w1list = [...words];
  const w2list = [...words];

  shuffleArray(w1list);
  shuffleArray(w2list);

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

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

let count = 0; 

export default function GeneratePuzzle(json) {
  const verbose = false;
  
  const [w1, w2, sideAssignments] = sample(words, verbose);

  return({
    name: w1.toUpperCase() + "-" + w2.toUpperCase(), 
    letters: Object.entries(sideAssignments).sort((a, b) => a[1] - b[1]).map(item => item[0].toUpperCase()).join(''),
    dimensions: {
      rows: 3,
      columns: 3
    }
  });
}