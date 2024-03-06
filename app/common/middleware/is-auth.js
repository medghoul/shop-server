const jwt=require('jsonwebtoken');
const config=require('../../config/config.json');

const isAuth=async(req,res,next)=>{
    const authHeader = req.get('Authorization');
    console.log(authHeader);
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.secret_key);
        console.log(decodedToken);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}
const isAdmin=async(req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.secret_key);
        if(decodedToken.userType==='admin'){
            return next();
        }else{
            res.status(401).json({error: 'You are not authorized to access this resource'});
        }
    }catch (err) {
        console.log(err);
        err.statusCode = 500;
        throw err;
    }

}
module.exports={
    isAuth,
    isAdmin
}
