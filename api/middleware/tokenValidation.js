import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    const TokenIndex =  req.headers.cookie?.split("; ").findIndex(item => item.includes('accessToken'));
    const authHeader = req.headers.cookie?.split("; ")[TokenIndex];
    const token = authHeader && authHeader.split('=')[1];



    if (token) {
        try{
            jwt.verify(token, process.env.TOKEN)
            next()
        } catch(error) {
            console.log(error)
            res.status(400).json({msg: "Token inválido"})
        }
    } else {
        return res.status(401).json({msg: "Acesso negado"})
    }
}

