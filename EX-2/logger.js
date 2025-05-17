// Logging middleware
 export function loggerMiddleware (req,res,next){
    const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${req.method} ${req.path} - Query:`, req.query);
        next();
}
