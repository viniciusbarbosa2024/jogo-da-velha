import {useState} from 'react'
import './TicTacToe.css'

export const TicTacToe = () => {
    const [position,setPosition] = useState(Array(9).fill('')) //Anotar sobre o .fill e sobre a declaração de array

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

    //Verificar se as posições jogadas retornam um vencedor do jogo
    function checkPlayedPositions(positionsToWin,X_positions,O_positions) {
        positionsToWin.forEach((winningStreak) => {

            if (winningStreak.every((element) => X_positions.indexOf(element) != -1) === true) {
                return alert('x ganhou')
            } else if (winningStreak.every((element) => O_positions.indexOf(element) != -1) === true) {
                return alert('O ganhou')
            }

       })
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

        checkPlayedPositions(positionsToWin,X_positions,O_positions)
       
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
            checkWinner(positionCopy)   
        }

    }

    
  
    return (
    <main>
        {position.map((element,index)=> {
            return (
                <div key={index} className={`position ${element}`} onClick={() => generalFunction(index)}>
                    
                </div> //Anotar sobre o key
            )
        })}
    </main>
  )
}
