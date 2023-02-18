import { useContext } from "react"
//import { AuthContext } from "../../context"
//import { Navigate, Route, Routes } from "react-router-dom"
import { GamePanel } from "../PlayGround/GamePanel"
import { LoginForm } from "../LoginForm/LoginForm"
import { AuthContext } from "../Context"
import { Route, Routes } from "react-router-dom"

interface AppProps {}

export const AppRouter: React.FC<AppProps> = ({}) => {
  //const { userName, saveName } = useContext(AuthContext)

  //userName = 'asd'

  return (
    <Routes>
      <Route path="/" element={<GamePanel />} />
    </Routes>
  // ) : (
  //   <Routes>
  //   <Route path="/" element={<GamePanel />} />
  //   <Route path="/game" element={<GamePanel />} />
  // </Routes>
  )

}

// <Route path="/game" element={<GamePanel />} /> 
// <Route path="/" element={<GamePanel />} />

/*
export const gameRoutes = [
  {
    path: process.env.ROUTE_PATH ? process.env.ROUTE_PATH + "/game" : "/game",
    component: GamePanel,
  },
]

export const loginRoutes = [
  {
    path: process.env.ROUTE_PATH ? process.env.ROUTE_PATH + "/authorization" : "/authorization",
    component: LoginForm,
  },
]

interface AppProps {}

export const AppRouter: React.FC<AppProps> = ({}) => {
  const { name, saveName } = useContext(AuthContext)
  let defaultPath = name ? "/game" : "/login"
  defaultPath = process.env.ROUTE_PATH
    ? process.env.ROUTE_PATH + defaultPath
    : defaultPath
  return name ? (
    <Routes>
      {privateRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={<r.component />}></Route>
      ))}
      <Route path="*" element={<Navigate to={defaultPath} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={
            <r.component
              onSubmit={(value) => {
                saveName(value)
                localStorage.setItem("auth", value)
              }}
            />
          }
        ></Route>
      ))}
      <Route path="*" element={<Navigate to={defaultPath} replace />} />
    </Routes>
  )
}
*/