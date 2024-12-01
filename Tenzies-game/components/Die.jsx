import React from "react"

function Dice({value, isHeld, holdDice}) {

const dotElements = [];

for(let i = 0; i < value; i++) {
dotElements.push(<div key={i} className="dot"></div>)
}

const styles = {
  backgroundColor: isHeld ? "#59E391" : "white"
}

    return(
    <>
    <div className="die-face" style={styles}  onClick={holdDice}>
    {dotElements}
      </div>
      </>
    )
}

export default Dice