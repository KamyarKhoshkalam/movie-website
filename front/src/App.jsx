import { useEffect, useState } from 'react'
import api from '../api'




function App() {
  // const [users,setUsers] = useState([])
  // useEffect(()=>{api({url:"users"}).then((res)=>{setUsers(res.data)})},[])
  const accessToken = async()=>await api({url:"token/",method:"post",data:{"username":"godUsopp","password":"godhimself"}}).then((res)=>res.data.access)

  const getUser = async(token)=>await api.get(`me/`,{headers:{Authorization:`Bearer ${token}`}}).then((res)=>res.data)

  const filan = async ()=>{
    const token = await accessToken()
    const user = await getUser(token)
    console.log(user)

  }

  filan()
}

export default App
