import { useState, useEffect } from 'react'
import Die from "../components/Die"
import Timer from "../components/Timer"
import RollsTracker from '../components/RollsTracker'
import Scoreboard from '../components/Scoreboard'
import './App.css'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"



function App() {
  
  const [dice, setDice] = useState(getRandomNumbers());
  const [rolls, setRolls] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

const [tenzies, setTenzies] = useState(false);
const [isPlayerName, setIsPlayerName] = useState(false);
const [isRunning, setIsRunning] = useState(false);
const [isEmptyUsername, setisEmptyUsername] = useState(false);
const [isUsernameEqual, setIsUsernameEqual] = useState(false);
const [isScoreBoardShowed, setIsScoreBoardShowed] = useState(true);

const [userScore, setUserScore] = useState([]);
const [userName, setUserName] = useState("");




useEffect(() => {

  let storedUsers = JSON.parse(localStorage.getItem("scoreboard")) || [];
  setUserScore(storedUsers);

},[])


function handleUserName(event) {
 setUserName(event.target.value)
  
}

function handleStartGame() {
 
  const allUserNames = userScore.map((user) => user.username)

if(userName.trim() === "") {
  setisEmptyUsername(true);
 return;
  } else if (allUserNames.includes(userName.trim())) {
    setIsUsernameEqual(true);
    return;
  }

  setIsPlayerName(true);
  const newUser = {username: userName, time: 0, rolls: 0};
  const updatedUsers = [...userScore, newUser];
  setUserScore(updatedUsers);
  localStorage.setItem("scoreboard", JSON.stringify(updatedUsers));
  

}

useEffect(() => {

const allHeld = dice.every((die) => die.isHeld);
const firstValue = dice[0].value;
const allSameValues = dice.every(die => die.value === firstValue);

if(allHeld && allSameValues) {
  setTenzies(true);
  setIsRunning(false);
 
} 

},[dice])



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


function getUserScore(currentName, currTime, currentRolls) {

  
  const updatedUsers = userScore.map((user) => 
    
    (user.username === currentName)
    ? {...user, time: currTime, rolls: currentRolls }
    : user
  );
  

  setUserScore(updatedUsers);
  localStorage.setItem("scoreboard", JSON.stringify(updatedUsers));
  setIsScoreBoardShowed(prev => !prev);

}


function toggleScore() {

  setIsScoreBoardShowed(prev => !prev);
}


const diceNumberElements = dice.map((die) => 
<Die 
key={die.id} 
value={die.value} 
isHeld={die.isHeld} 
holdDice={() => holdDice(die.id)}
/>)


  return (
  
<>
   { isScoreBoardShowed ? 
    
      <main className="main-wrapper" id="main-wrapper-style">
  
      {tenzies && <Confetti />}
      
      <section className="header-section">
      <h1 className="main-title">Tenzies</h1>
      <p className="main-paragraph"> <strong>Rules:</strong> Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
      </section>
      
      <section className="trackers-section">
      <Timer 
      formatTime={formatTime} 
      miliseconds={currentTime} 
      setmiliSeconds={setCurrentTime} 
      isRunning={isRunning} 
      isTenzies={tenzies} />
      
      <RollsTracker 
      isTenzies={tenzies} 
      rolls={rolls}/>
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
     {tenzies && <button onClick={() => getUserScore(userName, currentTime, rolls)} className="scoreboard-btn"> Scoreboard </button> } 
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
        <button onClick={toggleScore} className="scoreboard-btn"> Scoreboard </button>
         {isEmptyUsername && <p id='message'>Please provide a name</p> }
         {isUsernameEqual && <p id='message'>This username already exists.</p> }
       </form>}
    </main>
      
      :  <Scoreboard 
      users={userScore} 
      toggleScore={toggleScore}
      formatTime={formatTime}
       />
      }
    </>
  )
}

export default App


