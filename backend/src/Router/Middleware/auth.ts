const jwt = require("jsonwebtoken");

const auth = async(req : any,res : any,next : any)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader)
    {
        return res.status(403).json({
            message : "Login or Signup"
        });
    }
    try{
        jwt.verify(authHeader,"SECRET_KEY",(err:any,decoded:any)=>{
            if(err)
            {
                res.json({
                    message : "Error Verifying"
                });
            }
            else{
                next();
            }
        });
    }
    catch(err)
    {
        return res.status(403).json({
            message : "Authentication Failed"
        });
    }
}

module.exports = {auth}