import { useEffect} from 'react'

function Timer({miliseconds, setmiliSeconds, isRunning, isTenzies}) {
  
useEffect(() => {

    let interval;
    if(isRunning) {

        interval = setInterval(() => {
            setmiliSeconds(prev => prev + 10)

        },10);
    } else {
        clearInterval(interval);
    }

    return () => clearInterval(interval);

},[isRunning])


let minutes = Math.floor(miliseconds / 60000);
let seconds = Math.floor((miliseconds % 60000) / 1000);
let milisecs = Math.floor((miliseconds % 1000) / 10);


    return(

        <p>
        Time: 
        <span id='timer' style={{color: isTenzies ? "#0d4fca" : ""}}> 
         {minutes < 10 ? ` 0${minutes}` : minutes} 
        :{seconds < 10 ? `0${seconds}` : seconds}
        :{milisecs < 10 ? `0${milisecs}` : milisecs} 
        </span>
        </p>
        
    )

}

export default Timer