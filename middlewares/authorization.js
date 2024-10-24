import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import {users} from "../controllers/authentication.controller.js";

dotenv.config();

function soloAdmin(req, res, next) {
    const logueado = revisarCookie(req);
    if (logueado) return next();
    return res.redirect("/")
}

function soloPublic(req, res, next) {
    const logueado = revisarCookie(req);
    if (!logueado) return next();
    return res.redirect("/admin")
}

function revisarCookie(req) {
    try {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        console.log(decodificada)
        const userReview = users.find(user => user.user === decodificada.user);
        console.log(userReview)
        if (!userReview) {
            return false
        }
        return true;
    }
    catch {
        return false;
    }
}

export const methods = {
    soloAdmin,
    soloPublic,

}