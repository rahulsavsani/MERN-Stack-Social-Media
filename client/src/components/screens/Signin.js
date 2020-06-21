import React,{useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const Signin = ()=>{
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const PostData = ()=>{
        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
         
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error)
            {
                M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
                history.push('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }



    return(
        <div className="mycard">
           <div className="card auth-card">
               <h4>Sign In</h4>
        
               <input type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}/>

                <a className="waves-effect waves-light btn-large"
                onClick={()=>PostData()}
                >Sign In</a>

           </div>
       </div>
    )
}

export default Signin