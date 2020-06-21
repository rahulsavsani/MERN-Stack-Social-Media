  
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")
const User = mongoose.model("User")

router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email")
    .then(user=>{
        console.log(user)
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

})

router.get('/profile/:id', requireLogin, (req,res)=>{
    Post.find({postedBy:req.params.id})
    .populate("postedBy", "_id name")
      .then((posts)=>{
          console.log(posts)
          res.json({posts})
      })
      .catch(err=>{
          console.log(err)
      })
    
})

module.exports = router