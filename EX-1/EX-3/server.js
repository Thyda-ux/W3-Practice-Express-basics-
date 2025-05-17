// server.js
const fs = require('fs');
const express = require('express');
const app = express();

//Middle for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware for logging every request
app.use((req,res,next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

//Routing to home page
app.get ('/',(req ,res) => {
        res.send('Welcome to the Home Page');
    });
//Routing for contact page 
app.get ('/contact',(req,res) => {
        res.send(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
    });
//Routing for contact form submission page
app.post('/contact', (req, res) => {
    const name = req.body.name;
    fs.appendFile('submissions.txt', `${name}\n`,(err)=>{
        if(err){
            console.error('Failed to save submission',err);
            return res.status(500).send('Internal Server Error'); //500:Internal Server Error
        }
        res.send(`Thank you, ${name}, your form is submitted`);
    });
});


app.use((req ,res) => {
        res.status(404).send('404 Not Found');
    });

app.listen(3001, () => {
    console.log('Server is running at http://localhost:3001');
});
