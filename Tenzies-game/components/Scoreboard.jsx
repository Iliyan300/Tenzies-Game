

function Scoreboard({ users,toggleScore, formatTime}) {
  
const fileterdUsers = users.filter((user) => user.time > 0 ).sort((a,b) => a.time - b.time)

const usersList = (
  
  fileterdUsers.length > 0 
  
  ? <ul className="score-list">
{fileterdUsers.map((user, index) => (
<li key={index}>

<span id="ranking-nums"> {index + 1} </span> 
<strong> {user.username} </strong> 
Time: <strong> {formatTime(user.time)} </strong> 
Rolls: <strong> {user.rolls} </strong>

  </li>
))}
</ul> 

  : <p>No games played yet.</p>
)


    return (
      
    <div className='scoreboard'>
      <h2>Players Score:</h2>
      {usersList}
      <button onClick={toggleScore} className="scoreboard-btn"> Scoreboard </button>
    </div>

  )
    
}


  export default Scoreboard


