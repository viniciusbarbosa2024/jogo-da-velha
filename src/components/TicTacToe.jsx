import {useState} from 'react'
import './TicTacToe.css'

export const TicTacToe = () => {
    const [position,setPosition] = useState(Array(9).fill('')) //Anotar sobre o .fill e sobre a declaração de array

    function updatePosition(numberOfPlays,positionCopy,index) {
        //Validar se a posição clicada está disponível
        if (positionCopy[index] === '') {
            //Atualizar posição clicada
            if (numberOfPlays%2 == 0) {
                positionCopy[index] = 'X'
                setPosition(positionCopy)
            } else {
                positionCopy[index] = 'O'
                setPosition(positionCopy)
            }
        } else {
            return
        }
        
    }
    
    function generalFunction(index) {
        let numberOfPlays = position.filter((element)=> element === 'X' || element==="O").length

        let positionCopy = [...position]

        updatePosition(numberOfPlays,positionCopy,index)

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
