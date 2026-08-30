const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Response = require("../functions/response");
const User = require("../models/userModel");
const { sendEmail } = require("../services/emailService");
const bcrypt = require("bcrypt");

dotenv.config();
const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "12345678uytre";

const login = (req, res) => {
    const {userName, password} = req.body;
   if(userName == "" || password == ""){
    res.status(400);
    const response = new Response("error en login", null, "usuario y contraseña no contienen informacion")
    return res.json(response.json);
   }
   const  token = jwt.sign({user: userName}, JWT_KEY_SECRET, {expiresIn: "1h"});
   const response = new Response("login exitoso", {token}, null);
   console.log(response.json);
   res.json(response.json);
};

const forgotPassword = async (req, res) => {
    const {email} = req.body;
    if(email == ""){
        res.status(400);
        const response = new Response("error en forgot-password", null, "el correo no contiene informacion");
        return res.json(response.json);
    }
    const user = await User.findOne({where: {email: email}});
    if(!user){
        res.status(404);
        const response = new Response("error en forgot-password", null, "no existe un usuario con ese correo");
        return res.json(response.json);
    }
    const token = jwt.sign({email: user.email}, JWT_KEY_SECRET, {expiresIn: "15m"});
    await sendEmail(user.email, "Recuperar contraseña", `token para restablecer contraseña: ${token}`);

    const response = new Response("correo de recuperacion enviado", null, null);
    console.log(response.json);
    res.json(response.json);
};

const newPassword = async (req, res) => {
    const {token, newPassword} = req.body;
    if(token == "" || newPassword == ""){
        res.status(400);
        const response = new Response("error en new-password", null, "el token o la nueva contraseña no contienen informacion");
        return res.json(response.json);
    }
    try {
        const decoded = jwt.verify(token, JWT_KEY_SECRET);
        const user = await User.findOne({where: {email: decoded.email}});
        if(!user){
            res.status(404);
            const response = new Response("error en new-password", null, "no existe un usuario con ese correo");
            return res.json(response.json);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        const response = new Response("contraseña actualizada correctamente", null, null);
        res.json(response.json);
    } catch (error) {
        res.status(400);
        const response = new Response("error en new-password", null, "token invalido o expirado");
        return res.json(response.json);
    }
};

module.exports = {
    login,
    forgotPassword,
    newPassword
};