const colors = require('colors');
const { query } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    signIn: async (req, res) => {
        console.log(colors.cyan('signIn()'));

        const { email, password } = req.body;
        console.log(colors.cyan('email:'), email);
        console.log(colors.cyan('password:'), password);

        if(!email || !password) return res.status(400).send('Email et mot de passe requis');

        try {
            const results = await query('SELECT * FROM users WHERE email = ?', [email]);
            
            if (results.length === 0) {
                return res.status(404).send('Utilisateur non inscrit');
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send('Mot de passe incorrect');
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
            res.status(200).json({ token, user});
            
        } catch (error) {
            console.error(colors.red(error.message));
            res.status(500).send('Server error');
        }
    },

    register : async (req, res) => {
        console.log(colors.cyan('register()'));

        const { email, password } = req.body;
        console.log(colors.cyan('email:'), email);
        console.log(colors.cyan('password:'), password);

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const results = await query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
            console.log(colors.cyan('results:'), results);
            res.status(201).send('Utilisateur créé avec succès');
        } catch (error) {
            console.error(colors.red(error.message));
            res.status(500).send('Server error');
        }
    },

    getUser: async (req, res) => {
        console.log(colors.cyan('getUser()'));
        const token = req.header('auth-token');
        console.log(colors.cyan('token:'), token);
        if (!token) return res.status(401).send('Accès refusé');

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            console.log(colors.cyan('verified:'), verified);

            const results = await query('SELECT * FROM users WHERE id = ?', [verified.id]);
            console.log(colors.cyan('results:'), results);

            if (results.length === 0) {
                return res.status(404).send('Utilisateur non trouvé');
            }

            const user = results[0];
            res.status(200).send({ auth: true, user });
        } catch (error) {
            console.error(colors.red(error.message));
            res.status(500).send(error.message);
        }
    },
};
