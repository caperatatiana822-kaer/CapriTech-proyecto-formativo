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
const {getEmailUser} = require('../services/userService')

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

    const user =  await getEmailUser (email)

    if (!user.active) {
      const response = new Response(
        false,
        "Error en el login",
        "El usuario está inactivo",
      );
      return res.status(403).json(response);
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      const response = new Response(
        false,
        "Error en el login",
        "Usuario o contraseña incorrectos",
      );
      return res.status(401).json(response);
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      JWT_KEY_SECRET,
      {expiresIn: "2h",},);

    const response = new Response(true, "Login exitoso", {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error en login:", error);
    const response = new Response(
      false,
      "Error interno en el login",
      error.message,
    );
    return res.status(500).json(response);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const response = new Response(
      true,
      "Solicitud procesada",
      "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
    );
    if (!email) {
      return res.status(200).json(response);
    }
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(200).json(response);
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
    console.log('Token generado:', resetToken);
    console.log('Usuario:', user.email);

    await User.update(
      {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetTokenExpires
      },
      {
        where: { id: user.id }
      }
    );

    const userVerificado = await User.findOne({ where: { id: user.id } });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    let htmlContent = loadTemplate('forgotPassword', {
      '@name': user.name || user.userName || 'Usuario',
      '@link': resetLink
    });

    await sendEmail(
      user.email,
      "Recuperación de contraseña - CapriTech",
      `Token: ${resetToken}`,
      htmlContent
    );

    console.log('Correo enviado a:', user.email);

    return res.status(200).json(response);
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

    console.log('RESET PASSWORD');
    console.log('Token recibido:', token);

    if (!token) {
      return res.status(400).json({
        success: false,
        mensaje: "Token de recuperación requerido",
      });
    }

    const allUsers = await User.findAll({
      attributes: ['id', 'email', 'resetPasswordToken', 'resetPasswordExpires']
    });
    console.log('👥 Usuarios en BD:');
    allUsers.forEach(u => {
      console.log(`  - ${u.email}: Token=${u.resetPasswordToken ? 'SÍ' : 'NO'}`);
    });

    const user = await User.findOne({
      where: {
        resetPasswordToken: token
      }
    });

    console.log('Usuario encontrado por token:', user ? 'Sí' : 'No');

    if (!user) {
      return res.status(400).json({
        success: false,
        mensaje: "El token de recuperación no es válido",
      });
    }

    console.log('Token expira:', user.resetPasswordExpires);
    console.log('Ahora:', new Date());

    if (!user.resetPasswordExpires) {
      console.log('No tiene fecha de expiración');
      return res.status(400).json({
        success: false,
        mensaje: "El token de recuperación no es válido",
      });
    }

    if (new Date() > new Date(user.resetPasswordExpires)) {
      console.log('Token EXPIRADO');
      return res.status(400).json({
        success: false,
        mensaje: "El token de recuperación ha expirado",
      });
    }

    console.log('Token VÁLIDO');

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        mensaje: "La nueva contraseña es obligatoria",
      });
    }

    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        mensaje: "Debe confirmar la nueva contraseña",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        mensaje: "La contraseña debe tener mínimo 6 caracteres",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        mensaje: "Las contraseñas no coinciden",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await User.update(
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      },
      {
        where: { id: user.id }
      }
    );

    console.log('Contraseña actualizada para:', user.email);

    const now = new Date();
    const dateTime = now.toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    let htmlContent = loadTemplate('passwordUpdate', {
      '@name': user.name || user.userName || 'Usuario',
      '@dateTime': dateTime,
      '@device': req.headers['user-agent']?.includes('Chrome') ? 'Chrome en Windows' : 
                req.headers['user-agent']?.includes('Firefox') ? 'Firefox en Windows' : 
                req.headers['user-agent']?.includes('Safari') ? 'Safari en macOS' : 
                'Dispositivo desconocido',
      '@location': req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Colombia'
    });
   
    await sendEmail(
      user.email,
      "Contraseña actualizada - CapriTech",
      "Tu contraseña ha sido actualizada correctamente.",
      htmlContent
    );
    console.log('Correo de confirmación enviado');
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