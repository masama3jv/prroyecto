const usuariService = require("../services/usuariService");

exports.registre = async (req, res) => {
    try {
        const { nom, email, contrasenya } = req.body;
        const usuari = await usuariService.registrar(nom, email, contrasenya);
        res.status(201).json({ missatge: "Usuari registrat", usuari });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, contrasenya } = req.body;
        const result = await usuariService.login(email, contrasenya);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
