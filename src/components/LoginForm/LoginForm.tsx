import React, { useState, useContext } from "react"
import styles from "./LoginForm.module.css"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Context"

type LoginFormProps = {
  onSubmit: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [term, setTerm] = useState('')
  const { userName, setUserName: setUserName } = useContext(AuthContext)
  const navigate = useNavigate();

  return (
  <form
    onSubmit={(e) => {
      e.preventDefault()

      localStorage.setItem("auth", term)
      if (term) {
        navigate("/game", { replace: true });
      }
    }}
  >
    <div className={styles.centerScreen}>
      <div>Hello! Please enter your name:</div>
      <br />
      <input type="text" placeholder="Input your name" onChange={(e) => setTerm(e.target.value)} />
      <button
        type="submit"
        className={styles.submitButton}
      >
        Start
      </button>
    </div>
  </form>
)}
