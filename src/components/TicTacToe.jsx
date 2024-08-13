import {useState} from 'react'
import './TicTacToe.css'

export const TicTacToe = () => {
    const [position,setPosition] = useState(Array(9).fill(''))

    function updatePosition(index) {
        let numberOfPlays = position.filter((element)=> element === 'X' || element==="O").length

        let positionCopy = [...position]

        if (numberOfPlays%2 == 0) {
            positionCopy[index] = 'X'
            setPosition(positionCopy)
        } else {
            positionCopy[index] = 'O'
            setPosition(positionCopy)
        }
        
    }
  
    return (
    <main>
        {position.map((element,index)=> {
            return (
                <div key={index} className='position' onClick={() => updatePosition(index)}>
                    
                </div>
            )
        })}
    </main>
  )
}
