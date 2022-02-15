const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const router=express.Router();

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());


app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})
app.get('/index', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/blog', (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(initial_path, "login.html"));
})
app.get('/menu', (req, res) => {
    res.sendFile(path.join(initial_path, "menu.html"));
})
app.get('/contact', (req, res) => {
    res.sendFile(path.join(initial_path, "contact.html"));
})
app.get('/admin', (req, res) => {
    res.sendFile(path.join(initial_path, "login.html"));
})
app.get('/admin?role=admin', (req, res) => {
    res.sendFile(path.join(initial_path, "hi.html"));
})
app.get('/admin?role=*', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})
app.get('*', (req, res) => {
	res.statusCode = 404;
  			res.end(' Sorry, page not found');
})

// upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})



app.listen("4000", () => {
    console.log('Server running at http://127.0.0.1:4000');
})