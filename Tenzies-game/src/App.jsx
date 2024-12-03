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
const [currentTime, setCurrentTime] = useState(0);
const [showMessage, setShowMessage] = useState(false);



function handleUserName(event) {
  setUserName(event.target.value)
}

function handleStartGame() {
 
 if(userName.trim() === "") {
  
  setShowMessage(true);
  return;
  }


setIsPlayerName(true);
localStorage.setItem("playerUserName", userName);

}

useEffect(() => {
const allHeld = dice.every((die) => die.isHeld);
const firstValue = dice[0].value;
const allSameValues = dice.every(die => die.value === firstValue);


if(allHeld && allSameValues) {
  setTenzies(true);
  setIsRunning(false);
  saveBestAchievement(currentTime, rolls);
} 


},[dice])


function saveBestAchievement(currTime, currRolls) {

const bestAchievement = JSON.parse(localStorage.getItem('bestAchievement'));

if(!bestAchievement || 
  currTime < bestAchievement.time || (currTime === bestAchievement.time && currRolls < bestAchievement.rolls)) 
  {

  const newBest = {time: currTime, rolls: currRolls}

  localStorage.setItem(`bestAchievement`, JSON.stringify(newBest));
  alert("new best time saved!")

}
}


function formatTime(miliseconds) {

let minutes = Math.floor(miliseconds / 60000);
let seconds = Math.floor((miliseconds % 60000) / 1000);
let milisecs = Math.floor((miliseconds % 1000) / 10);

return ` ${minutes}:${String(seconds).padStart(2,0)}:${String(milisecs).padStart(2,0)}`

}


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


}

function holdDice(id) {
  setDice(oldDice => oldDice.map((die) => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  setIsRunning(true);
}

function newGame() {
  setDice(getRandomNumbers());
  setTenzies(false);
  setRolls(0);
  setIsRunning(false);
  setCurrentTime(0);

}

const toggleResetBtn = () => {
 
return (isRunning === true && tenzies === false) && <button className='stop-reset-btn' onClick={newGame}>Stop & Reset</button>
  
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
      
      <section className="header-section">
      <img src="/Tenzies-logo.png" className='logo' />
      <h1 className="main-title">Tenzies</h1>
      <p className="main-paragraph"> <strong>Rules:</strong> Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
      </section>
      
      <section className="trackers-section">
      <Timer formatTime={formatTime} miliseconds={currentTime} setmiliSeconds={setCurrentTime} isRunning={isRunning} isTenzies={tenzies} />
      <RollsTracker isTenzies={tenzies}  rolls={rolls}/>
      </section>

      { isPlayerName ?
      <section className="dice-section">
      <div className='dice-wrapper'>
      {diceNumberElements}
      </div>
      {tenzies 
      ? <button className="control-btn" onClick={newGame}> New game </button>  
      : <button className="control-btn" onClick={rollDice}> Roll </button>}
     {toggleResetBtn()}
      </section> 

      : <form>
       <input 
       className='username-input' 
       type="text" 
       name="userName" 
       placeholder='Name:' 
       value={userName} 
       onChange={handleUserName} 
       />
        <button 
        type="button" 
        className="start-game-btn" 
        onClick={handleStartGame}>
        Start Game 
        </button>
         {showMessage && <p id='message'>Please provide a name</p> }
       </form>}
        
    </main> 
  )
}

export default App


