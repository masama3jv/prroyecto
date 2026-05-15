const Usuari = require("../models/Usuari");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registrar = async (nom, email, contrasenya) => {
    const existeix = await Usuari.findOne({ email });
    if (existeix) throw new Error("L'usuari ja existeix");

    const nouUsuari = new Usuari({ nom, email, contrasenya });
    await nouUsuari.save();
    return nouUsuari;
};

exports.login = async (email, contrasenya) => {
    const usuari = await Usuari.findOne({ email });
    if (!usuari) throw new Error("Credencials incorrectes");

    const esCorrecte = await bcrypt.compare(contrasenya, usuari.contrasenya);
    if (!esCorrecte) throw new Error("Credencials incorrectes");

    const token = jwt.sign(
        { id: usuari._id, email: usuari.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { usuari, token };
};
