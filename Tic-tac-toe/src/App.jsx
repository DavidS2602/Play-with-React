import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o',
}


const Square = ({ children, isSelected, updateBoard, index }) => {
  const className=`square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],//
  [0, 4, 8],//
  [0, 3, 6],//
  [1, 4, 7],//
  [2, 5, 8],//
  [2, 4, 6],//
  [3, 4, 5],//
  [6, 7, 8],//
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))//Tablero

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)//Null sin ganador, false empate

  const CheckWinner = (boardToCheck) => {
    //Revisamos todas las combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c])
        {
        return boardToCheck[a]
      }
    }
    //Si no hay ganador.
    return null
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
      setWinner(NewWinner)
    }
  }
  console.log('updateBoard')

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
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
    </main>
  )
}

export default App
