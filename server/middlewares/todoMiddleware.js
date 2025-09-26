import Jwt from 'jsonwebtoken';
import todomodel from '../models/todomodel.js';
import Joi from 'joi'
// import authModel from '../models/authModel.js'
export const todoMiddleware = async (req, res, next) => {

    const checkAuthorization = req.header("Authorization");
    // console.log(checkAuthorization);
    if (!checkAuthorization) {
        return res.status(401).json({
            message: "Sry you are unauthrorized you have to login first",
        })
    }
    try {
        const isVerified = Jwt.verify(checkAuthorization, process.env.SECRET_KEY);
        console.log(isVerified)

        req.user = isVerified._id
        req.userName = isVerified.name
        next()

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Invalid token"
        })
    }

}

export const todoValidation = (req,res,next) => {
    try {
        const todoValidationSechema = Joi.object({
            title:Joi.string().min(3).required(),
            content:Joi.string().min(3).required()
        })

        const {error} = todoValidationSechema.validate(req.body);
        if(error){
            return res.status(400).json({
                error
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:"Error found while validating by joi",
            error
        })
        
    }
    next()
}