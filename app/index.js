import express from 'express'
import cookieParser from 'cookie-parser';
import { methods as authentication } from '../controllers/authentication.controller.js';
import { methods as authorization } from '../middlewares/authorization.js';
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// server
const app = express();
app.set("port", 3000);
app.listen(app.get("port"));
console.log("server running in port" + app.get("port"));

// config
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());


// routes GET
app.get("/",authorization.soloPublic, (req,res) => res.sendFile(__dirname + "/page/login.html"))
app.get("/register",authorization.soloPublic, (req,res) => res.sendFile(__dirname + "/page/register.html"))
app.get("/admin",authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/page/admin/admin.html"))

// routes POST
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);



