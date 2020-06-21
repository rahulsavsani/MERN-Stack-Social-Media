import React,{useState, useReducer} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = ()=>{
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const PostData = ()=>{
        fetch("/signup", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
            }
            else{
                M.toast({html: data.message, classes:"#66bb6a green lighten-1"})
                history.push('/signin')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
       <div className="mycard">
           <div className="card auth-card">
               <h4>Sign Up</h4>
               <input type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}/>
               <input type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}/>

                <a className="waves-effect waves-light btn-large"
                    onClick={()=>PostData()}>
                        Sign Up</a>

           </div>
       </div>
    )
}

export default Signup