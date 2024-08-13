import {useState} from 'react'
import './TicTacToe.css'

export const TicTacToe = () => {
    const [position,setPosition] = useState(Array(9).fill('')) //Anotar sobre o .fill e sobre a declaração de array

    const [result,setResult] = useState('')

    //Atualizar estado da posição
    function updatePosition(numberOfPlays,positionCopy,index) {
            if (numberOfPlays%2 == 0) {
                positionCopy[index] = 'X'
                setPosition(positionCopy)
            } else {
                positionCopy[index] = 'O'
                setPosition(positionCopy)
            }
        
    }

    //Obter array de posições jogadas por dado player
    function getPositions(positionCopy,player) {
        let positions = []
        for (let pos =0;pos< positionCopy.length;pos++) {
            if (positionCopy[pos] === player) {
                positions.push(pos)
            }
        }

        return positions
    }

    //Verificar se dada sequência vencedora está contida no array das posições jogadas por determinado jogador
    function checkWinningSequence(winningSequence,positionsPlayed) {
        return (
            winningSequence.every((element) => positionsPlayed.indexOf(element) != -1)
        )
        //Anotar sobre a igualdade de arrays e sobre o .every 
    }

    //Verificar se as posições jogadas retornam um vencedor do jogo
    function checkPlayedPositions(positionsToWin,X_positions,O_positions) {
        let result = ''
        positionsToWin.forEach((winningSequence) => {

            if (checkWinningSequence(winningSequence,X_positions) === true) {
                result = 'X ganhou'
            } else if (checkWinningSequence(winningSequence,O_positions) === true) {
                result = 'O ganhou'
            }

       })

       return result
    }

    function checkWinner(positionCopy){
        //Arrays com sequência de posições que posibilitam a vitória
        let positionsToWin = [
            //Horizontal
            [0,1,2],
            [3,4,5],
            [6,7,8],
    
            //Vertical
            [0,3,6],
            [1,4,7],
            [2,5,8],
    
            //Diagonal
            [0,4,8],
            [2,4,6]
           ]
       
        let X_positions = getPositions(positionCopy,'X')
        let O_positions = getPositions(positionCopy,'O')

        return checkPlayedPositions(positionsToWin,X_positions,O_positions)
       
    }
    
    function generalFunction(index) {
        let numberOfPlays = position.filter((element)=> element === 'X' || element==="O").length

        let positionCopy = [...position]

        //Validar se a posição está disponível
        if (positionCopy[index] === 'X' || positionCopy[index] === 'O') {
            return
        } else {
            //Verificar o funcionamento da renderização a partir do setPosition nesse caso
            updatePosition(numberOfPlays,positionCopy,index) 

            let winner = checkWinner(positionCopy)
            winner != '' ? setResult(winner):false
        }

    }

    
  
    return (
    <div>
        <main>
            {position.map((element,index)=> {
                return (
                    <div key={index} className={`position ${element}`} onClick={() => generalFunction(index)}>
        
                    </div> //Anotar sobre o key
                )
            })}
        </main>
        <div className='result'>Resultado: <span>{result}</span></div>
    </div>
  )
}
