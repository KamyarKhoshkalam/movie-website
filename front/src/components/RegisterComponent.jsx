import { useState } from "react"
import { Navigate } from "react-router-dom"
import api from "../../api"

const RegisterComponent = ()=>{
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [password2,setPassword2] = useState("")
  const [loading,setLoading] = useState(false)
  const [redirect,setRedirect] = useState(false)

  const handleSubmit = async(username,email,password,password2)=>{
    try{
      setLoading(true)
      await api.post("register/",{username,password,email,password2})
      setRedirect(true)
    } catch(err){console.log(err)}
    finally{setLoading(false)}
  }
  
  if(redirect){
    return <Navigate to="/login"></Navigate>
  }

  return(
    <form method="POST" onSubmit={(e)=>{
      e.preventDefault()
      handleSubmit(username,email,password,password2)}}>
      <input type="text" placeholder="username" name="username" onChange={(e)=>{setUsername(e.target.value)}} />
      <input type="text" placeholder="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
      <input type="text" placeholder="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} />
      <input type="text" placeholder="verify password" name="password2" onChange={(e)=>{setPassword2(e.target.value)}} />
      <input type="submit"/>
      {loading ? <h2>loading</h2>:null}
    </form>
  )
}

export default RegisterComponent