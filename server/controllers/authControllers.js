import authModel from '../models/authModel.js'
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // console.log(req);
        const user = await authModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exist",
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new authModel({
            name,
            email,
            password:hashPassword
        });

        const saveUser = await newUser.save();

        return res.status(201).json({
            message:"Signup Successfully",
            success:true,
            saveUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Error Found",
            error
        })
    }
}

export const login = async(req,res) => {
    try {
        const {email, password} = req.body;

        const user = await authModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"invalid email",
                success:false
            })
        }

        const checkPassword = await bcrypt.compare(password,user.password);

        if(!checkPassword){
            return res.status(400).json({
                message:"invalid password",
                success:false
            })
        }

        const jwtToken = Jwt.sign({_id:user._id,name:user.name},process.env.SECRET_KEY,{expiresIn:'24h'});

        return res.status(201).json({
            message:"Login Successfully",
            success:true,
            jwtToken
        })
    } catch (error) {
        return res.status(400).json({
            message:"Error found while login",
            success:false,
            error
        })
    }

}