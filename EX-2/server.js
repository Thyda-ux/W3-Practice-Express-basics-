// server.js
import express from 'express';
import courses from './course.js';
import { loggerMiddleware } from './logger.js';
import { validateQueryMiddleware } from './validateQuery.js';
import { authMiddleware } from './auth.js';
const app = express();
const PORT = 3000;

//Global Middleware
app.use(loggerMiddleware);
app.use(authMiddleware);

// Default route for GET /
app.get('/', (req, res) => {
    res.send('Welcome to the Course API. Use /departments/:dept/courses to get course data.');
});

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses',validateQueryMiddleware,(req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    const min = req.query.minCredits ? parseInt(req.query.minCredits, 10) : null;
    const max = req.query.maxCredits ? parseInt(req.query.maxCredits, 10) : null;

let filtered = courses.filter(
      c => c.department.toLowerCase() === dept.toLowerCase()
    );

    if (filtered.length === 0) {
      return res
        .status(404)
        .json({ error: `Department '${dept}' not found.` });
    }

//Filtering query 

if(level){
    filtered  = filtered.filter(c => c.level === level.toLowerCase());
}
if(min !== null){
    filtered = filtered.filter(c => c.credits >= min);
}
if(max!== null){
    filtered = filtered.filter(c => c.credits <= max);
}
if(semester){
    filtered = filtered.filter(c => c.semester.toLowerCase() === semester.toLowerCase());
}
if(instructor){
    filtered = filtered.filter(c => c.instructor.toLowerCase() === instructor.toLowerCase());
}

if (filtered.length === 0){
    return res.status(200).json({ message: "No matching courses found.", data:[] });
}
//Json array returned
return res.json({filtered,meta: {
    total:filtered.length},});
}); 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
