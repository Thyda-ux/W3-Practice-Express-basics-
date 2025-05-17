// server.js
const express = require('express');
const app = express();

//Middleware for logging every request
app.use((req,res,next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});
   

//Routing to home page
    app.get('/',(req,res) => {
        res.end(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
        `);
    })
        
// 404 Error Handler 
app.use((req,res) => {
        res.status(404).send('404 Not Found');
    });

// Start Express server
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
