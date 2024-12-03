import { useEffect} from 'react'

function Timer({miliseconds, setmiliSeconds, isRunning, isTenzies, formatTime}) {
  
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



    return(

        <p>
        Time: <span id='timer' style={{color: isTenzies ? "#0d4fca" : ""}}>  
        {formatTime(miliseconds)}
        </span>
        </p>
        
    )

}

export default Timer