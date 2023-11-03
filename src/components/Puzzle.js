import { useParams } from 'react-router-dom'

export default function Puzzle() {
  const { id } = useParams();
  return(
  <>
  Puzzle "{id}"
  </>
  );
}