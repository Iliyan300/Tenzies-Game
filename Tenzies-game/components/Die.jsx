import React from "react"

function Dice(props) {

const dotElements = [];

for(let i = 0; i < props.value; i++) {
dotElements.push(<div key={props.id} className="dot"></div>)
}

const styles = {
  backgroundColor: props.isHeld ? "#59E391" : "white"
}

    return(
    <>
    <div className="die-face" style={styles}  onClick={props.holdDice}>
    {dotElements}
      </div>
      </>
    )
}

export default Dice