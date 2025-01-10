
function RollsTracker({rolls, isTenzies}) {

return(

    <p> Rolls: <span id="rolls" style={{color: isTenzies ? "#0d4fca" : ""}}> {rolls} </span> </p>
)
}

export default RollsTracker