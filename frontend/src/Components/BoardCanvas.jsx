import { useRef, useState, useEffect } from "react"
import { Stage, Layer, Line } from "react-konva"
import { getBoardActions } from "../api"
import { useNavigate } from "react-router-dom"


function BoardCanvas({ board_id }) {
    const stageRef = useRef(null)
    const navigate = useNavigate()

    const [lines, setLines] = useState([])
    const [newLine, setNewLine] = useState()
    const isDrawing = useRef(false)
    const socketRef = useRef(null)

    useEffect(() => {
        (async () => {
            try {
                const data = await getBoardActions(board_id) 
                setLines(data)
            } catch(err) {
                if (err.response?.status === 403) {
                    navigate('/')
                }
                console.log(err)
            }
        })()
    }, [])

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/board/${board_id}/`)
        socketRef.current = socket

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            setLines(prev => {
                if (data.tempId) {
                    return prev.map(line => 
                        line.tempId === data.tempId ? { ...data, id: data.id } : line
                    )
                }

                return [...prev, data]
            })
        }

        return () => socket.close()
    }, [board_id])

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
        isDrawing.current = false
        const tempId = `temp_${Date.now()}`
        setLines(prev => [...prev, { tempId: tempId, payload: newLine }])
        setNewLine(null)

        socketRef.current.send(JSON.stringify({
            payload: newLine,
            tempId
        }))
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
                        stroke="gray"
                    />
                )}
            </Layer>
        </Stage>
        </>
    ) 
}


export default BoardCanvas
