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
const [showMessage, setShowMessage] = useState(false);
const [isScoreBoardShowed, setIsScoreBoardShowed] = useState(true);

const [userScore, setUser] = useState([]);
const [userName, setUserName] = useState("");



useEffect(() => {

  let storedUsers = JSON.parse(localStorage.getItem("scoreboard")) || [];
  setUser(storedUsers);

},[])


function handleUserName(event) {
  setUserName(event.target.value)
}

function handleStartGame() {
 
 if(userName.trim() === "") {
  setShowMessage(true);
  return;
  }

  setIsPlayerName(true);
  
  const newUser = {userName, time: 0, rolls: 0};
  const updatedUsers = [...userScore, newUser];
  setUser(updatedUsers);
  localStorage.setItem("scoreboard", JSON.stringify(updatedUsers));
  setUserName("");

  

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

function showScore() {

  setIsScoreBoardShowed(prev => !prev);
 
};

/*  NEED TO FIX THIS!

function getUserScore(currentName, currentTime, currentRolls) {

  const updatedUsers = userScore.map((user) => 
    user.userName === currentName
    ? {...user, time: formatTime(currentTime), rolls: currentRolls }
    : user
  );

  setUser(updatedUsers);
  localStorage.setItem("scoreboard", JSON.stringify(updatedUsers));

}

*/ 

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
     {tenzies && <Scoreboard showScore={showScore} />} 
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
      
      :  <section className='scoreboard'>

<h1> Scoreboard </h1>
        <ul className='score-list'> 
          
          <li>Name: Iliikata</li>
          <li>Time: 15:20:23</li>
          <li>Rolls: 25</li>
          
        </ul>
        <Scoreboard 
        showScore={showScore} 
        userName={userName} 
        rolls={rolls} 
        currentTime={currentTime}/>
      </section>
      
      
      }
    </>
  )
}

export default App


