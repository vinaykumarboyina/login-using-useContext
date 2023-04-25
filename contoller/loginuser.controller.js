const Registeruser = require('../model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.post = async (req,res) => {
    const {email,password} = req.body
    try {
        let exist = await Registeruser.findOne({email})
        if(!exist){
            return res.status(400).json({message:'User Not found'})
        }

        // Compare the entered password with the hashed password using bcrypt
        const passwordMatch = await bcrypt.compare(password, exist.password);

        if(!passwordMatch){
            return res.status(400).json({message:'Invalid Credentials'})
        }
        let payload = {
            user:{
                id: exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token) =>{
                if(err) throw err;
                res.json({token})
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Server Error'})
    }
}