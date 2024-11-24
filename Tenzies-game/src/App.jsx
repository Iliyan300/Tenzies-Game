import { useState } from 'react'
import Die from "/components/Die"
import './App.css'
import { nanoid } from "nanoid"


function App() {
  
const [dice, setDice] = useState(getRandomNumbers());

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

}

function holdDice(id) {

  setDice(oldDice => oldDice.map((die) => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  
}




const diceNumberElements = dice.map((die) => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)


  return (
    <main className="main-wrapper">
      <h1 className="main-title">Tenzies</h1>
      <p className="main-paragraph">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
        <div className='button-wrapper'>
      {diceNumberElements}
      </div>
      {<button className="control-btn" onClick={rollDice}>Roll</button>}
    </main>
  )
}

export default App

