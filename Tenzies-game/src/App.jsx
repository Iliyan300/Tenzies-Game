import { useState, useEffect } from 'react'
import Die from "../components/Die"
import Timer from "../components/Timer"
import RollsTracker from '../components/RollsTracker'
import './App.css'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"



function App() {
  
const [dice, setDice] = useState(getRandomNumbers());
const [tenzies, setTenzies] = useState(false);
const [rolls, setRolls] = useState(0);
const [userName, setUserName] = useState("");
const [isPlayerName, setIsPlayerName] = useState(false);
const [isRunning, setIsRunning] = useState(false);
const [miliseconds, setmiliSeconds] = useState(0);



function handleUserName(event) {
  setUserName(event.target.value)
}

function handleStartGame() {
 
 if(userName.trim() === "") {

  return;
  }

setIsPlayerName(true)
localStorage.setItem(`player: ${nanoid()}`, userName);

}

useEffect(() => {
 const allHeld = dice.every((die) => die.isHeld);
const firstValue = dice[0].value;
const allSameValues = dice.every(die => die.value === firstValue);

if(allHeld && allSameValues) {
  setTenzies(true);
  setIsRunning(false)
} 
},[dice])


function generateNumbers() {
  return {
    value: Math.ceil(Math.random() * 6), 
    isHeld: false, 
    id: nanoid()
  }
}


function getRandomNumbers() {
const newDice = [];
for(let i = 0; i < 10; i++) {
newDice.push(generateNumbers())
}
return newDice;
}

function rollDice() {
setDice(oldDice => oldDice.map((die) => {
  return die.isHeld ? die : generateNumbers()
  
}))

setRolls(prev => prev + 1);
setIsRunning(true);

}

function holdDice(id) {
  setDice(oldDice => oldDice.map((die) => die.id === id ? {...die, isHeld: !die.isHeld} : die))
}

function newGame() {
  setDice(getRandomNumbers());
  setTenzies(false);
  setRolls(0);
  setIsRunning(false)
  setmiliSeconds(0)

}

const toggleResetBtn = () => {
 
return (rolls > 0 && tenzies === false) && <button className='stop-reset-btn' onClick={newGame}>Stop & Reset</button>
  
}



const diceNumberElements = dice.map((die) => 
<Die 
key={die.id} 
value={die.value} 
isHeld={die.isHeld} 
holdDice={() => holdDice(die.id)}
/>)


  return (
    <main className="main-wrapper">
  
      {tenzies && <Confetti />}
      <img src="/Tenzies-logo.png" className='logo'></img>
      <h1 className="main-title">Tenzies</h1>
      <p className="main-paragraph"> <strong>Rules:</strong> Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
      <div className="trackers-wrapper">
        
      <Timer miliseconds={miliseconds} setmiliSeconds={setmiliSeconds} isRunning={isRunning} />
      <RollsTracker  rolls={rolls}/>
      </div>

      { isPlayerName ?
      
      <div className="interface">
      <div className='button-wrapper'>
      {diceNumberElements}
      </div>
      { tenzies 
      ? <button className="control-btn" onClick={newGame}>New game</button> 
      : <button className="control-btn" onClick={rollDice}>Roll</button> }
     
      { toggleResetBtn() }
  
      </div> 

      : <form>
       <input className='username-input' type="text" name="userName" placeholder='Name:' value={userName} onChange={handleUserName}></input> 
       <button className="start-game-btn" onClick={handleStartGame}>Start Game</button>
        {!userName ? <p>Please provide name</p> : <p>Are you ready {userName}?</p>}
       </form>}
        
    </main> 
  )
}

export default App


