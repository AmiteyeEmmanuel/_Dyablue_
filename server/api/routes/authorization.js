const express = require('express');
const router = express.Router();
const pool = require('../../database');
const bodyParser = require('body-parser');
const authmiddleware = require('../../middleware/authmiddleware')

router.use(bodyParser.json());

router.post('/', authmiddleware, async (req, res) => {
    try {
        // Get the user email from the token payload
        const userEmail = req.user.email;

        // Query the database to get the user information based on the email
        const getUserQuery = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(getUserQuery, [userEmail]);

        // Check if the user exists
        if (result.rows.length === 0) {
            return res.status(404).send({ message: "User not found", success: false });
        }

        // Return the user information
        const user = result.rows[0];
        res.status(200).send({
            // message: `Welcome to the dashboard, user ${user.email}!`,
            user: { email: user.email, user_id: user.user_id },
            success: true,
            data: { ...user, password: ''}
        });
    } catch (error) {
        res.status(500).send({ message: 'Error getting user info', success: false, error });
    }
});

module.exports = router;