import React from "react"

function Dice(props) {

const styles = {
  backgroundColor: props.isHeld ? "#59E391" : "white"
}

    return(
    <>
      <h2 onClick={props.holdDice} style={styles}>{props.value}</h2>
      </>
    )
}

export default Dice