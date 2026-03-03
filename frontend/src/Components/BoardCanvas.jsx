import { useRef, useState } from "react"
import { Stage, Layer, Line } from "react-konva"

function BoardCanvas() {
    const stageRef = useRef(null)

    const [lines, setLines] = useState([])
    const [newLine, setNewLine] = useState()
    const isDrawing = useRef(false)

    const handleMouseDown = () => {
        const stage = stageRef.current
        if (stage) {
            const pointerPosition = stage.getPointerPosition()
            if (pointerPosition) {
                const {x, y} = pointerPosition
                setNewLine({id: Date.now(), points: [x, y]})
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

    const handleMouseUp = () => {
        setLines(p => ([...p, newLine]))
        setNewLine(null)
        isDrawing.current = false
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
                    points={line.points}
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
