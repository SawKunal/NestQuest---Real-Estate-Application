import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "You are not authenticated"})
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload)=> {
        if(err){
            return res.status(401).json({message: "Invalid token"})
        } 
        req.userId = payload.id;
        next();
    })
}