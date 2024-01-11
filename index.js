const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json')

const app = express()
const PORT = 3000

//Middleware - plugin
app.use(express.urlencoded({ extended: false }));

//render the "/" route
app.get('/', (req, res) => {
    res.send("Hello Express");
})

//confermation that tha app is running fine on port = 3000
app.listen(PORT, () => {
    console.log(`App is running at PORT: ${PORT}`);
})

//GET Request
//send the html data on "/usernames"
app.get('/usernames', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//send the json data on "/api/users"
app.get('/api/users', (req, res) => {
    res.send(users);
})
// dynamic routes for each user
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})


//POST Request
 
app.post('/api/users', (req, res) => {
    //Create new user
    const body = req.body;
    //console.log(body);
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "sucess", id: users.length });
    })
    
});


//PATCH Request

app.patch('/api/users/:id', (req, res) => {
    //Updating the user with id
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    //console.log(userIndex);
    const body = req.body;
    //console.log(body);
    users[userIndex] = { ...users[userIndex], ...body };
    
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "sucess", user: users[userIndex] });
    })
})

//DELETE Request

app.delete('/api/users:id', (req, res) => {
    //Delete the user with id
    return res.json({ status: "pending" });
})
/* 
//Merging all requests with id 
app.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = user.find((user) => user.id === id);
    return res.json(user);
})
.patch((req, res) => {})
.delete((req, res) => {}); */