const validToken = "xyz123";

export function authMiddleware(req,res,next){
    const token = req.query.token;
     if (!token || token!==validToken){
        return res.status(401).json({error: 'Invalid or missing API token. '});
    }
    next();
};