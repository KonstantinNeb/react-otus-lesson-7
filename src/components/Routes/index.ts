import { GamePanel } from "../PlayGround/GamePanel"
import { LoginForm } from "../LoginForm/LoginForm"

export const gameRoutes = [
  {
    path: process.env.ROUTE_PATH ? process.env.ROUTE_PATH + "/game" : "/game",
    component: GamePanel,
  },
]

export const loginRoutes = [
  {
    path: process.env.ROUTE_PATH
      ? process.env.ROUTE_PATH + "/authorization"
      : "/authorization",
    component: LoginForm,
  },
]
