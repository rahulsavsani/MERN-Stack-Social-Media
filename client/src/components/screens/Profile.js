import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

const Profile = ()=>{
    const [data, setData] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        fetch(`/profile/${id}`, {
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
        .catch(err=>{
            console.log(err)
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

export default Profile