import { observer } from 'mobx-react-lite'
import PuzzleStore from '../stores/PuzzleStore'

interface QwertyProps {
    store: typeof PuzzleStore
  }

export default observer(function Qwerty({store}) {
    const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"]
    return (<div>
        {qwerty.map((row) => (
            <div className ="flex justify-center qwerty">
                {row.split('').map((char) => {
                    const validationLetter = store.exactGuesses.includes(char) 
                      ? 'correctPlacement'
                      : store.inexactGuesses.includes(char)
                      ? 'wrongPlacement'
                      : store.allGuesses.includes(char)
                      ? 'wrongLetter'
                      : 'notGuessed'
                
                    return(
                        <div className={`m-0.5 flex h-10 w-8 items-center justify-center rounded-md uppercase ${validationLetter} letter`}>
                            {char}
                        </div>
                    )
                })}
            </div>
        ))}
    </div>
    )
})