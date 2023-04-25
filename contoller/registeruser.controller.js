const Registeruser = require('../model')
const bcrypt = require("bcrypt")
const multer = require('multer')

const imgconfig = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}. ${file.originalname}`)
    }
})

const isImage = (req, file, callback) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        callback(null, true);
    } else {
        callback(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
}


const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
}).single('avatar')


exports.post = async(req,res) => {
    upload(req, res, async (err) => {
        if(err){
            console.log(err)
            return res.status(400).json({error: 'Error uploading file'})
        }
        const {filename} = req.file;
        const{username,email,password} = req.body
        console.log('req', req)
        try{
            // console.log(req.body)
            let exist = await Registeruser.findOne({email})
            if(exist){
                return res.status(400).json({error:'Email already registered'})
            }
            
            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log({
                username,
                email,
                password:hashedPassword,
                image:filename
            },"+++++++++++++++++++") 

            // create new user
            let newUser = Registeruser({
                username,
                email,
                password:hashedPassword,
                image:filename
            })

            await newUser.save()
            res.status(200).json({message:'Registered Successfully', user: newUser})
        }catch(err){
            console.log(err)
            return res.status(500).json({message: 'Internal server error'})
        } 
    })
}



  
  