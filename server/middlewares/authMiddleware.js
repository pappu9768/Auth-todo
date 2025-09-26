import Joi from 'joi';

export const signupValidation = (req,res,next) => {
    try {
        const signupSchema = Joi.object({
            name:Joi.string().min(4).max(120).required(),
            email:Joi.string().min(8).max(120).required(),
            password:Joi.string().min(5).max(15).required()
        })

        const {error} = signupSchema.validate(req.body);

        if(error){
            return res.json({
                error
            })
        }
    } catch (error) {
        console.log(error)
    }
    next()
}

export const loginValidation = (req,res,next) => {
    try {
        const loginSchema = Joi.object({
            email:Joi.string().min(8).max(20).required(),
            password:Joi.string().min(5).max(12).required()
        })

        const {error} = loginSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                error
            })
        }
    } catch (error) {
        console.log(error)
    }

    next()
}