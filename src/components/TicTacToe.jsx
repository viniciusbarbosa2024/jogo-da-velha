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

    function checkWinner(positionCopy){
       let X_positions = []
       let O_positions = []
       for (let pos =0;pos< positionCopy.length;pos++) {
        if (positionCopy[pos] === 'X') {
            X_positions.push(pos)
        } else if (positionCopy[pos] === 'O'){
            O_positions.push(pos)
        }
       }

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
