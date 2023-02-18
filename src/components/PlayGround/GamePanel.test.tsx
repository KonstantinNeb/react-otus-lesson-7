import { render, screen, act, fireEvent } from "@testing-library/react"
import { GamePanel } from "./GamePanel"

import "@testing-library/jest-dom"
import { Provider} from "react-redux"
import { createStore, Store } from "redux"
import { GameStateReducer } from "../Store/store"
import { BrowserRouter} from "react-router-dom"

let store: Store
describe("render tests", () => {
  beforeEach(() => {
    store = createStore(GameStateReducer)
  })
  it("render", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GamePanel />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByTestId("speed")).toBeInTheDocument()
    expect(screen.getByTestId("run")).toBeInTheDocument()
    expect(screen.getByTestId("restart")).toBeInTheDocument()
  })
  it("state test cells count", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GamePanel />
        </Provider>
      </BrowserRouter>
    )
    const cellCount = screen.getByPlaceholderText("Cell count")
    act(() => {
      fireEvent.change(cellCount, { target: { value: "5" } })
    })
    const values = store.getState()
    expect(values.length).toBe(5)
  })
  it("state test percentage", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GamePanel />
        </Provider>
      </BrowserRouter>
    )
    const percentage = screen.getByPlaceholderText("Population")
    const startButton = screen.getByTestId("run")

    act(() => {
      fireEvent.change(percentage, { target: { value: "100" } })
      startButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    let values: boolean[] = store.getState()
    expect(values.reduce((x, y) => x && y)).toBe(true)

    act(() => {
      fireEvent.change(percentage, { target: { value: "0" } })
      startButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    values = store.getState()
    expect(values.reduce((x, y) => x || y)).toBeFalsy()
  })
  it("after restart state changed", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GamePanel />
        </Provider>
      </BrowserRouter>
    )
    const restartButton = screen.getByTestId("restart")
    const values: boolean[] = store.getState()
    store.subscribe(() => {
      const values2: boolean[] = store.getState()
      expect(
        values2.filter((x, index) => x !== values[index]).length
      ).toBeGreaterThan(0)
    })
    act(() => {
      restartButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
  })
  it("after stop state the same", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GamePanel />
        </Provider>
      </BrowserRouter>
    )
    const runButton = screen.getByTestId("run")
    const values: boolean[] = store.getState()
    store.subscribe(() => {
      const values2: boolean[] = store.getState()
      expect(values2.filter((x, index) => x !== values[index]).length).toBe(0)
    })
    act(() => {
      runButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
  })

  it("render Logout button", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GamePanel />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText("Logout")).toBeInTheDocument()
  })
  it("render Logout button click", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <GamePanel />
        </Provider>
      </BrowserRouter>
    )
    const button = screen.getByText("Logout")
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
  })  
})
