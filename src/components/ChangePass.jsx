import React,{useState} from 'react'

const ChangePass = () => {
    const [password ,setPass]=useState("")

    const handlePass=()=>{
      const payload={
       password
       }
       localStorage.setItem('newPassword', password);
    }
  return (
    <div>
      <p>
      ChangePass
      </p>

< input type="password" value={password} name='password' placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>
<button onClick={handlePass}>change password</button>
    </div>
        

  )
}

export default ChangePass