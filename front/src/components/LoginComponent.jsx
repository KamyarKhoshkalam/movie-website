import { useState } from "react"
import privateApi from "../../privateApi"
import { Navigate } from "react-router-dom"

const LoginComponent = ()=>{
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [redirect,setRedirect] = useState(false)

  const handleSubmit = async(username,password)=>{
    try{
      setLoading(true)
      const res = await privateApi.post("token/",{username,password})
        localStorage.setItem("access",res.data.access)
        localStorage.setItem("refresh",res.data.refresh)
        setRedirect(true)
    } catch(err){console.log(err)}
    finally{setLoading(false)}
  }
  
  if(redirect){
    return <Navigate to="/"></Navigate>
  }

  return(
    <form method="POST" onSubmit={(e)=>{
      e.preventDefault()
      handleSubmit(username,password)}}>
      <input type="text" name="username" onChange={(e)=>{setUsername(e.target.value)}} />
      <input type="text" name="password" onChange={(e)=>{setPassword(e.target.value)}} />
      <input type="submit"/>
      {loading ? <h2>loading</h2>:null}
    </form>
  )
}

export default LoginComponent