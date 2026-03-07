import { useParams } from "react-router-dom"
import BoardCanvas from "../Components/BoardCanvas"

function Board() {
    const { board_id } = useParams()
    return (
        <>
        <BoardCanvas board_id={board_id}/>
        </>
    )
}


export default Board
