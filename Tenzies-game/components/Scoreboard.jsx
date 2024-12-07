

function Scoreboard({ users, toggleScore, formatTime}) {
  
const fileterdUsers = users.filter((user) => user.time > 0)

const usersList = (
  
  fileterdUsers.length > 0 
  
  ? <ul className="score-list">
{fileterdUsers.map((user, index) => (
<li key={index}>
 <strong>{user.username}</strong> Time: <strong>{formatTime(user.time)}</strong> Rolls: <strong>{user.rolls}</strong>
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


