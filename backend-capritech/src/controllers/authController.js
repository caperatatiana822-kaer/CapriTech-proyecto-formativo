const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const Response = require("../functions/response");
const { sendEmail } = require("../services/emailService");
const User = require("../models/userModel");
const { getEmailUser, updateEmailUser, getTokenUser } = require('../services/userService');


dotenv.config();
const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "3247890sihsdfg2345sdfg";

const loadTemplate = (templateName, params) => {
  const templatePath = path.join(__dirname, '../../public/templates', `${templateName}.html`);

  if (!fs.existsSync(templatePath)) {
    console.log('Plantilla no encontrada, usando HTML básico');
    return null;
  }
  let html = fs.readFileSync(templatePath, 'utf-8');
  Object.keys(params).forEach(key => {
    html = html.replace(new RegExp(key, 'g'), params[key] || '');
  });
  
  return html;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json(new Response(false, "Error en el login", null, ["Usuario o contraseña incorrectos"]).json);
    }

    if (!user.active) {
      return res.status(403).json(new Response(false, "Error en el login", null, ["El usuario está inactivo"]).json);
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json(new Response(false, "Error en el login", null, ["Usuario o contraseña incorrectos"]).json);
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      JWT_KEY_SECRET,
      { expiresIn: "2h" }
    );

    const response = new Response(true, "Login exitoso", {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    return res.status(200).json(response.json);
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json(new Response(false, "Error interno en el login", null, [error.message]).json);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const successResponse = new Response(
      true,
      "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña."
    );

    if (!email) return res.status(200).json(successResponse.json);

    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(200).json(successResponse.json);

    const resetToken = Buffer.from(user.uuid).toString('base64');
    let data = {
      resetPasswordToken: resetToken,
      resetPasswordExpires: new Date(Date.now() + 3600000) 
    }
    await updateEmailUser(email, data);


    const routeJson = path.join(process.cwd(), 'public', 'templates', 'forgotPassword.json');
    const dataTemplate = JSON.parse(fs.readFileSync(routeJson, 'utf8'));

    let htmlModific = fs.readFileSync(dataTemplate.html, 'utf8');

    for (const key in dataTemplate.params) {
      if (key === "@link") {
        // htmlModific = htmlModific.replace(`{{${key}}}`, dataTemplate.params[key] + resetToken);
        htmlModific = htmlModific.split(`{{${key}}}`).join(dataTemplate.params[key] + resetToken);
      } else {
        // htmlModific = htmlModific.replace(`{{${key}}}`, dataTemplate.params[key]);
        htmlModific = htmlModific.split(`{{${key}}}`).join(dataTemplate.params[key]);
      }
    }

    // htmlModific = htmlModific.replace(`{{@name}}`, user.name || "Usuario");
    htmlModific = htmlModific.split(`{{@name}}`).join(user.name || "Usuario");

    await sendEmail(
      user.email,
      dataTemplate.subject || "Recuperación de contraseña - CapriTech",
      `Tu enlace: ${dataTemplate.params["@link"]}${resetToken}`,
      htmlModific
    );

    console.log('Correo enviado a:', user.email);

    return res.status(200).json(successResponse.json);
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    return res.status(500).json({
      success: false,
      mensaje: error.message,
    });
  }
};

const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        mensaje: "Token de recuperación requerido",
      });
    }

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        mensaje: "El token de recuperación no es válido o ha expirado",
      });
    }

    return res.status(200).json({
      success: true,
      mensaje: "Token válido",
      data: { valid: true },
    });
  } catch (error) {
    console.error("Error en verifyResetToken:", error);
    return res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    // 1. Validar los datos que llegan
    if (!token) return enviarError(res, "Token de recuperación requerido");
    if (!newPassword) return enviarError(res, "La nueva contraseña es obligatoria");
    if (!confirmPassword) return enviarError(res, "Debe confirmar la nueva contraseña");
    if (newPassword.length < 6) return enviarError(res, "La contraseña debe tener mínimo 6 caracteres");
    if (newPassword !== confirmPassword) return enviarError(res, "Las contraseñas no coinciden");

    const user = await getTokenUser(token);
    if (!user || !user.resetPasswordExpires) {
      return enviarError(res, "El token de recuperación no es válido");
    }
    if (new Date() > new Date(user.resetPasswordExpires)) {
      return enviarError(res, "El token de recuperación ha expirado");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      { where: { id: user.id } }
    );

    const userAgent = req.headers['user-agent'] || '';
    let device = 'Dispositivo desconocido';

    if (userAgent.includes('Chrome')) device = 'Chrome en Windows';
    else if (userAgent.includes('Firefox')) device = 'Firefox en Windows';
    else if (userAgent.includes('Safari')) device = 'Safari en macOS';

    const dateTime = new Date().toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const htmlContent = loadTemplate('passwordUpdate', {
      '@name': user.name || user.username || 'Usuario',
      '@dateTime': dateTime,
      '@device': device,
      '@location': req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Colombia',
    });

    await sendEmail(
      user.email,
      "Contraseña actualizada - CapriTech",
      "Tu contraseña ha sido actualizada correctamente.",
      htmlContent
    );

    return res.status(200).json({
      success: true,
      mensaje: "Contraseña restablecida correctamente",
    });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    return res.status(500).json({
      success: false,
      mensaje: error.message,
    });
  }
};

module.exports = {
  login,
  forgotPassword,
  verifyResetToken,
  resetPassword,
};