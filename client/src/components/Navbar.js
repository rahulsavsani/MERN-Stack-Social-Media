  
import React,{useContext,useEffect,useState, useRef} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const NavBar = ()=>{
      
  const  searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
   const {state,dispatch} = useContext(UserContext)
   const history = useHistory()
   useEffect(()=>{
       M.Modal.init(searchModal.current)
   },[])

                const renderList = ()=>{
                  if(state)
                  {    return [
                  
                    <li><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,

                  <li><Link to="/createpost">Create Post</Link></li>,
                                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                                onClick={()=>{
                                  localStorage.clear()
                                  dispatch({type:"CLEAR"})
                                  history.push('/signin')
                                }}
                                >
                                  Logout
                                </button>
                              ]
                            }
                            else{
                  return[
                      <li><Link to="/signin">Sign In</Link></li>,
                      <li><Link to="/signup">Sign Up</Link></li>
                        
                    ]
                  }
                }



                const fetchUsers = (query)=>{
                  setSearch(query)
                  fetch('/search-users',{
                    method:"post",
                    headers:{
                      "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                      query
                    })
                  }).then(res=>res.json())
                  .then(results=>{
                    console.log(results)
                    setUserDetails(results.user)
                  })
               }


    return(
        <nav>
        <div className="nav-wrapper">
          <Link to={state?'/':'/signin'} className="brand-logo left">Facebook</Link>
          <ul id="nav-mobile" className="right">
              {renderList()}

          </ul>


          <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={"/profile/"+item._id} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
        </div>
      </nav>
    )
}

export default NavBar