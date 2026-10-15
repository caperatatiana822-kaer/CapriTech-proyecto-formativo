const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60*1000,
    max: 200,
    message:{
        success:false,
        message:"demasiadas solicitudes. Intenta nuevamente en 1 minuto."
    },
    handler: (req, res) => {
        console.log("RATE LIMIT ACTIVADO");
        res.status(429).json({
            success: false,
            message: "Demasiadas solicitudes"
        });
    }
})

module.exports = limiter;