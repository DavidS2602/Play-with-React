import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'


import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import {TURNS} from './constants'
import { CheckWinner, checkEndGame } from './logic/board'

function App() {
  const [board, setBoard] = useState(() => {
    //Storages the game
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })//Tablero

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)//Null sin ganador, false empate


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')//Eliminar el storage
    window.localStorage.removeItem('turn')//Eliminar el storage
  }


  const updateBoard = (index) => {
    //No actualizar si hay ganador o si ya hay una ficha
    if(board[index] || winner) return
    //Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Checar ganador
    const NewWinner = CheckWinner(newBoard)
    if(NewWinner) {
      confetti()
      setWinner(NewWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected = {turn === TURNS.O}>{TURNS.O}</Square>

      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
