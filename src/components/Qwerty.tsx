import { observer } from 'mobx-react-lite'
import PuzzleStore from '../stores/PuzzleStore'

interface QwertyProps {
    store: typeof PuzzleStore
}

const Qwerty: React.FC<QwertyProps> = ({ store }) => {
    const qwerty = ["q w e r t y u i o p", "a s d f g h j k l", "✔ z x c v b n m <-"]

    const handleKeyClick = (key: string) => {
        if (key === "✔") key ='Enter';
        else if (key === "<-") key = 'Backspace';
        
        const event = new KeyboardEvent('keyup', { key });
        store.handleKeyup(event);
    };

    return (<div>
        {qwerty.map((row) => (
            <div className ="flex justify-center qwerty">
                {row.split(' ').map((char) => {
                    const validationLetter = store.exactGuesses.includes(char) 
                      ? 'correctPlacement'
                      : store.inexactGuesses.includes(char)
                      ? 'wrongPlacement'
                      : store.allGuesses.includes(char)
                      ? 'wrongLetter'
                      : 'notGuessed'
                
                    return(
                        <div 
                            className={`m-0.5 flex h-10 w-8 items-center justify-center rounded-md uppercase ${validationLetter} letter`}
                            onClick={() => handleKeyClick(char)}
                            >
                            {char}
                        </div>
                    )
                })}
            </div>
        ))}
    </div>
    )
}

export default Qwerty;