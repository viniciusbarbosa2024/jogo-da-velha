import {useState} from 'react'
import './TicTacToe.css'

export const TicTacToe = () => {
    //Refere-se ao status de cada posição (Vazia,X,O)
    const [position,setPosition] = useState(Array(9).fill('')) //Anotar sobre o .fill e sobre a declaração de array

    //Refere-se ao resultado do jogo
    const [result,setResult] = useState('')

    //Refere-se a tríade de posições que fez o jogo ter um vencedor
    const [winningTriad,setWinningTriad] = useState([])

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
                setWinningTriad(winningSequence)
                result = 'X ganhou'
            } else if (checkWinningSequence(winningSequence,O_positions) === true) {
                setWinningTriad(winningSequence)
                result = 'O ganhou'
            }

       })

       return result
    }

    //Verificar vencedor do jogo
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

    //Verificar empate
    function checkDraw(positionCopy) {
        if(positionCopy.indexOf('') != -1){
            return
        } else {
            return 'Empate'
        }
    }

    //Verificar resultado do jogo
    function checkResult(positionCopy) {
        let verifier = checkWinner(positionCopy)

        if ( verifier != '') {
            //verifier != '' ? setResult(verifier):false
            return verifier
        } else {
            verifier = checkDraw(positionCopy)
            if (verifier === 'Empate') {
                return verifier
            } else {
                return 'Jogo em andamento'
            }
        }


    }

    //Reinicia jogo
    function restart() {
        setWinningTriad([])
        setPosition(Array(9).fill(''))
        setResult('')
    }

    //Verifica se a posição clicada está ocupada ou não
    function PositionAvailability(positionCopy,index) {
        if (positionCopy[index] === 'X' || positionCopy[index] === 'O') {
            return false
        } else {
            return true
        }
    }

    //Verifica se o jogo acabou
    function gameOver() {
        if (result != '') {
            return true
        } else {
            return false
        }
    }

    //Verifica se a jogada é válida ou não
    function validatePlay(positionCopy,index) {
        if (PositionAvailability(positionCopy,index) == false || gameOver() == true) {
            return 'Invalid play'
        } else {
            return 'Valid play'
        }
    }
    
    //Estiliza a tríade de posições que gerou a vitória de determinado jogador
    function stylizeWinningTriad(index,winningTriad) {
        if (winningTriad.indexOf(index) != -1) {
            return 'winningTriad'
        } else {
            return ''
        }
    }

    function generalFunction(index) {
        let numberOfPlays = position.filter((element)=> element === 'X' || element==="O").length

        let positionCopy = [...position]

        //Validar se a posição está disponível
        if (validatePlay(positionCopy,index) == 'Invalid play') {
            return
        } else {
            //Verificar o funcionamento da renderização a partir do setPosition nesse caso
            updatePosition(numberOfPlays,positionCopy,index) 

            //checkResult(positionCopy)
            let checkResultReturn = checkResult(positionCopy)
            switch (checkResultReturn) {
                case 'Jogo em andamento':
                    return 
                default:
                    setResult(checkResultReturn)
                    break
            }
        }

    }

    
  
    return (
    <div>
        <main>
            {position.map((element,index)=> {
                return (
                    <div key={index} className={`position ${element} ${stylizeWinningTriad(index,winningTriad)}`} onClick={() => generalFunction(index)}>
        
                    </div> //Anotar sobre o key
                )
            })}
        </main>

        <div className='result'>
            Resultado: <span>{result}</span>
        </div>

        <button className='restart' onClick={restart}>Reiniciar</button>
    </div>
  )
}
