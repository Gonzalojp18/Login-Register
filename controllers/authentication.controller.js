import bcryptjs from 'bcryptjs';
import JsonWebToken  from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const users = [{
    user: "Harry Potter",
    email: "camaradelossecretos@voldemort.si",
    password: "9314",
}]

// LOGIN
async function login(req, res){
    const user = req.body.user;
    const password = req.body.password;

// Validar que los campos esten completos
        if(!user || !password){
            return res.status(400).send({status: 'error', message: 'campos incompletos'});
        }

// Validar que el usuario ya esta registrado, evitar duplicaciones.
    const userReview = users.find(userCheck => userCheck.user === user);
    if(!userReview){
        return res.status(400).send({status: 'error', message: 'Error durante login'})
    }
    const accessLogin = await bcryptjs.compare(password, userReview.password);
    if(!accessLogin) {
        return  res.status(400).send({status: 'error', message: 'Error durante login'})
    }
        const token = JsonWebToken.sign(
            {user:userReview.user},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRATION});

        const cookieOption = {
            expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
        }

        res.cookie("jwt",token,cookieOption);
        res.send({status:"ok",message:"Usuario logeado",redirect:"/admin"})


}

// REGISTER
async function register(req, res){
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    // Validar que los campos esten completos
    if(!user || !email || !password){
        return res.status(400).send({status: 'error', message: 'campos incompletos'});
    }

    // Validar que el usuario ya esta registrado, evitar duplicaciones.
    const userReview = users.find(userCheck => userCheck.user === user);
    if(userReview){
        return res.status(400).send({status: 'error', message: 'usuario ya existe'})
    }

// create an crypto key by security
const salt = await bcryptjs.genSalt(5);
const hashPasswoord = await bcryptjs.hash(password,salt)

// Una vez que el usuario fue registrado, es guardado.
const newUser = {
    user, email, password: hashPasswoord
}

console.log(newUser);
// add new users in the array
users.push(newUser);
    return res.status(201).send({status:"ok", message:"user added", redirect:"/"})
}

// exportación de metodos
export const methods = {
    login,
    register
}