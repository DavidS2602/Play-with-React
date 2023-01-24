import { WINNER_COMBOS } from '../constants'

export const CheckWinner = (boardToCheck) => {
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

