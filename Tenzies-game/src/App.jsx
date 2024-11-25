import { useState, useEffect } from 'react'
import Die from "/components/Die"
import './App.css'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  
const [dice, setDice] = useState(getRandomNumbers());
const [tenzies, setTenzies] = useState(false);
const [rolls, setRolls] = useState(0);
const [seconds, setSeconds] = useState(0);
const [isActive, setIsActive] = useState(false)



useEffect(() => {

 const allHeld = dice.every((die) => die.isHeld);
const firstValue = dice[0].value;
const allSameValues = dice.every(die => die.value === firstValue);

if(allHeld && allSameValues) {
  setTenzies(true);
}

},[dice])

useEffect(() => {
  
  let interval;
  
    if(isActive) {
    interval = setInterval(() => {
      setSeconds(prev => prev + 1)
      },1000)
    } 
  
  return () => clearInterval(interval);

},[isActive])

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
setIsActive(true)

}

function holdDice(id) {

  setDice(oldDice => oldDice.map((die) => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  
}

function newGame() {
  setDice(getRandomNumbers());
  setTenzies(false);
  setRolls(0);
}

const diceNumberElements = dice.map((die) => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)


  return (
    <main className="main-wrapper">
      {tenzies && <Confetti />}
      <h1 className="main-title">Tenzies</h1>
      <p className="main-paragraph">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
        { rolls > 0 && <h3>0:0{seconds}</h3> }
        <div className='button-wrapper'>
      {diceNumberElements}
      </div>
      { tenzies 
      ? <button className="control-btn" onClick={newGame}>New game</button> 
      : <button className="control-btn" onClick={rollDice}>Roll</button> }
      <p>Rolls: {rolls} </p>
    </main>
  )
}

export default App


