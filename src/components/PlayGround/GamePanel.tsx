import { Field } from "../Field/Field"
import { PlayProp } from "../PlayProp/PlayProp"
import { FieldProp } from "../FieldProp/FieldProp"
import { AuthContext } from "../Context"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { GAME_FIELDWIDTH, GAME_FIELDHEIGHT, GAME_CELLCOUNT, GAME_POPULATION, GAME_SPEED } from "../Game/Game"

interface GamePanelProps {}

export const GamePanel: React.FC<GamePanelProps> = ({}) => {
  const dispatch = useDispatch()
  const gameState = useSelector<boolean[], boolean[]>((state) => state)

  const [running, setRunning] = useState(true)
  const [restart, setRestart] = useState(false)
  const [speed, setSpeed] = useState(GAME_SPEED)

  const [width, setWidth] = useState(GAME_FIELDWIDTH)
  const [height, setHeight] = useState(GAME_FIELDHEIGHT)
  const [cellCount, setCellCount] = useState(GAME_CELLCOUNT)
  const [percentage, setPercentage] = useState(GAME_POPULATION)
  const [userName, setUserName] = useState<string | null>(null)
  useEffect(() => {
    if (running && !gameState) {
      dispatch({ type: "INIT", payload: { cellCount, percentage } })
    }
  }, [running, gameState])
  useEffect(() => {
    dispatch({ type: "INIT", payload: { cellCount, percentage } })
  }, [restart, cellCount, percentage])
  useEffect(() => {
    if (running) {
      const timer = window.setTimeout(() => {
        const cellInRow = cellCount ? Math.ceil(Math.sqrt(cellCount)) : 0
        dispatch({ type: "NEXT_STEP", payload: { cellInRow } })
      }, 1000 / speed)
      return () => clearTimeout(timer)
    }
  })

  const navigate = useNavigate();

  const logoutButtonClick = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  }
  return (
    <div style={{ width: GAME_FIELDWIDTH }}>
      <AuthContext.Provider
        value={{
          userName: userName,
          setUserName: setUserName,
        }}
      >
        <div style={{fontSize: 18, paddingBottom: 20, color: "red"}} >Welcome to game of life, {localStorage.getItem("auth")}! &nbsp;&nbsp;&nbsp; 
          <button
            type="submit"
            onClick={() => logoutButtonClick()}
          >
            Logout
          </button>
        </div>
        <PlayProp
          onRestart={() => {
            setRestart((prev) => !prev)
          }}
          onPlayChange={setRunning}
          onSpeedChange={setSpeed}
        ></PlayProp>
        <FieldProp
          onCellCountChange={setCellCount}
          onHeightChange={setHeight}
          onPopulationChange={setPercentage}
          onWidthChange={setWidth}
        ></FieldProp>
        <Field width={width} height={height} cellCount={cellCount} />
      </AuthContext.Provider>
    </div>
  )
}
