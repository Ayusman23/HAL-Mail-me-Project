
const asyncHandler =require('express-async-handler');
//const Contact=require('../models/contactModel');
const User=require('../models/userModel');
const jwt =require('jsonwebtoken');
const bcrypt=require("bcrypt");
const Template=require('../models/templateModel');
const createDefaultTemplates = async (userId, userName) => {
    const defaultTemplates = [
      { type: "NEWS", header: "Latest News for {name}", content: "Here are the latest updates and news...", footer: "Stay tuned for more news." },
      { type: "OFFER", header: "Special Offer for {name}", content: "We are excited to offer you...", footer: "Don’t miss out on this special offer!" },
      { type: "INVITATION", header: "You’re Invited, {name}", content: "We are pleased to invite you to...", footer: "We look forward to seeing you!" },
      { type: "WELCOME", header: "Welcome {name}!", content: "We are thrilled to welcome you...", footer: "Thanks for joining us!" },
      { type: "PROMOTIONAL", header: "Exclusive Promotion for {name}", content: "Check out our latest promotion...", footer: "Enjoy your shopping!" }
    ];
  
    for (const templateData of defaultTemplates) {
      const template = new Template({
        ...templateData,
        header: templateData.header,
        content: templateData.content,
        footer: templateData.footer,
        user_id: userId
      });
      
      await template.save();
     // console.log(template);
    }
  };
const register=asyncHandler(
    async (req,res)=>{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            res.status(404);
            throw new Error("All fields are required");
        }
        const userAvailable = await User.findOne({email:email});

        //console.log(userAvailable);
        if(userAvailable){
            res.status(404);
            throw new Error("user already in use ");
        }
        //hashing the password
        const hashed=await bcrypt.hash(password,10);

        // console.log(hashed);
        // console.log(username,email,password);
        const user = await User.create({
            username,
            email,
            password:hashed,
        });
        console.log(`user created ${user}`);
        if(user){
            await createDefaultTemplates(user.id, username);

            res.status(201).json({_id:user.id,email:user.email});

        }else{
            res.status(404);
            throw new Error("user data is unavailabel");
        }
        res.status(200).json({
            message:"Register the user"
        });
}
);
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //console.log(password);
    if (!email || !password) {
        res.status(400).json({
            message: "All fields are required"
        });
        return;
    }

    try {
        const user = await User.findOne({ email: email });

        if (user && user.password && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
                process.env.ACCESS_TOKEN, {
                expiresIn: "20m"
            });

            res.status(200).json({
                accessToken: accessToken
            });
        } else {
            res.status(401).json({
                message: "Invalid email or password"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

const current=asyncHandler(
    
    async (req,res)=>{
        
        res.status(200).json(
            req.user_id
        );
}
);

module.exports={register, login, current};