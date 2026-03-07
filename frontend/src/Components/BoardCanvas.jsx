import { useRef, useState, useEffect } from "react"
import { Stage, Layer, Line } from "react-konva"
import { createBoardAction, getBoardActions } from "../api"


function BoardCanvas({ board_id }) {
    const stageRef = useRef(null)

    const [lines, setLines] = useState([])
    const [newLine, setNewLine] = useState()
    const isDrawing = useRef(false)

    useEffect(() => {
        (async () => {
            try {
                const data = await getBoardActions(board_id) 
                setLines(data)
            } catch(err) {
                console.log(err)
            }
        })()
    }, [])

    const handleMouseDown = () => {
        const stage = stageRef.current
        if (stage) {
            const pointerPosition = stage.getPointerPosition()
            if (pointerPosition) {
                const {x, y} = pointerPosition
                setNewLine({points: [x, y]})
                isDrawing.current = true
            }
        }
    }

    const handleMouseMove = () => {
        if (!isDrawing.current) return

        const stage = stageRef.current
        if (stage) {
            const pointerPosition = stage.getPointerPosition()
            if (pointerPosition) {
                const {x, y} = pointerPosition
                setNewLine(p => ({...p, points: [...p.points, x, y]}))
            }
        }
    }

    const handleMouseUp = async () => {
        const tempId = Date.now()
        setLines(p => ([...p, { payload: newLine, tempId }]))
        setNewLine(null)
        isDrawing.current = false

        const savedLine = await createBoardAction(board_id, {
            payload: newLine,
            action_type: "stroke",
        })

        setLines(p => p.map(line => line.tempId === tempId ? savedLine : line))
    }

    return (
        <>
        <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        >
            <Layer>
                {lines.map(line => (
                    <Line
                    key={line.id}
                    points={line.payload.points}
                    stroke="black"
                    />
                ))}

                {newLine && (
                    <Line 
                        points={newLine.points}
                        stroke="black"
                    />
                )}
            </Layer>
        </Stage>
        </>
    ) 
}


export default BoardCanvas
