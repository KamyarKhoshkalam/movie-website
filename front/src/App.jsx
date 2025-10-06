import { useEffect, useState } from 'react'


function App() {
  const [users,setUsers] = useState([])

  useEffect(()=>{fetch("http://127.0.0.1:8000/api/users/").then((res)=>res.json()).then((pons)=>{setUsers(pons),console.log(pons)})},[])

  console.log(users)

  
}

export default App
