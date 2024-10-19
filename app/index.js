import express from 'express'
import { methods as authentication } from './controllers/authentication.controller.js';

// fix to __dirname to absolute path
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// server
const app = express();
// create instan of express
app.set("port", 4000);
app.listen(app.get("port"));
console.log("server running in port" + app.get("port"));

// config
app.use(express.static(__dirname + '/public'));
app.use(express.json());





// routes
// this way can have access at my html pagues
app.get("/", (req,res) => res.sendFile(__dirname + "/page/login.html"))
app.get("/register", (req,res) => res.sendFile(__dirname + "/page/register.html"))
app.get("/admin", (req,res) => res.sendFile(__dirname + "/page/admin/admin.html"))

app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);



