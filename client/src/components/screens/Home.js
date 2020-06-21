import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const Home = ()=>{

    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch('/allPosts', {
            headers:{
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
    },[])

    return(
        <div className="home">
            {
                data.map(item=>{
                    return(
                            <div className="card home-card">
                                <h5>{item.postedBy.name}</h5>
                            
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                                
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home