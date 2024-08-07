import ReactCardFlip from "react-card-flip"

export default function Guess({isGuessed, guess, word}) {
    return (
        <div className="grid grid-cols-5 gap-2 mb-2 guess">
            {new Array(5).fill(0).map((_, i)  => {

                const delayStyle = isGuessed 
                ?{
                    animationDelay: `${0.4*(i+1)}s`
                }:{};

                /* Formatting Class */
                const validationFormat = !guess[i]
                ? 'empty'
                : !isGuessed
                /* Not Guessed Letter */
                ? 'notGuessed' //'bg-gray-400' 
                : guess[i] === word[i]
                /* Corret Placement */
                ? 'correctPlacement' //'bg-green-400'
                : word.includes(guess[i])
                /* Incorrect Placement */
                ? 'wrongPlacement' //'bg-yellow-400'
                /* Incorrect Letter */
                : 'wrongLetter' //'bg-black'

                // const animationDelay = 0.2*(i+1)



                return (
                        <div className={`w-16 h-16 border flex items-center justify-center font-bold uppercase ${validationFormat}`} style={delayStyle}>
                            {guess[i]}
                        </div>
                    
                )
            }
            
                
            )}
        </div>
    )
}