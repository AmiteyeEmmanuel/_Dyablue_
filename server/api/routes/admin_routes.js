const express = require('express');
const router = express.Router();
const pool = require('../../database');
const bodyParser = require('body-parser');
const authmiddleware = require('../../middleware/authmiddleware')


router.use(bodyParser.json());


router.get('/get-all-users', authmiddleware, async (req, res) => {
    try {
        // Query to fetch all users
        const getAllUsersQuery = `SELECT * FROM users`;

        // Execute the query
        const result = await pool.query(getAllUsersQuery);

        // Send the user data in the response
        res.status(200).send({ message: 'Users retrieved successfully', users: result.rows, success: true });
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});


router.get('/get-all-hairstylists', authmiddleware, async (req, res) => {
    try {
        // Query to fetch all hairstylists
        const getAllHairstylistsQuery = `SELECT * FROM Hairstylists`;

        // Execute the query
        const result = await pool.query(getAllHairstylistsQuery);

        // Send the hairstylist data in the response
        res.status(200).send({ message: 'Hairstylists retrieved successfully', hairstylists: result.rows, success: true });
    } catch (error) {
        console.error('Error getting all hairstylists:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});

router.get('/get-all-bookings', authmiddleware, async (req, res) => {
    try {
        // Query to fetch all hairstylists
        const getAllBookingsQuery = `SELECT * FROM bookings`;

        // Execute the query
        const result = await pool.query(getAllBookingsQuery);

        // Send the hairstylist data in the response
        res.status(200).send({ message: 'Bookings retrieved successfully', data: result.rows, success: true });
    } catch (error) {
        console.error('Error getting all Bookings:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});


router.post("/update-stylist-status", authmiddleware, async (req, res) => {
    try {
        // Get the hairstylist_id, status, and user_id from req.body
        const { hairstylist_id, status, user_id } = req.body;

        // Update the status of the hairstylist in the Hairstylists table
        const updateStatusQuery = 'UPDATE Hairstylists SET status = $1 WHERE hairstylist_id = $2';
        await pool.query(updateStatusQuery, [status, hairstylist_id]);

        // Update the ishairstylist column in the users table based on the status and email in the Hairstylists table
        const updateIsHairstylistQuery = `
            UPDATE users 
            SET ishairstylist = $1 
            WHERE email = (
                SELECT email FROM Hairstylists WHERE hairstylist_id = $2
            )`;
        const isHairstylist = status === 'APPROVED';
        await pool.query(updateIsHairstylistQuery, [isHairstylist, hairstylist_id]);

        // Get the updated user data
        const getUserQuery = 'SELECT * FROM users WHERE user_id = $1';
        const userResult = await pool.query(getUserQuery, [user_id]);
        const userData = userResult.rows[0];

        // Construct notification data for the user
        const notificationData = {
            type: "new stylist request changed",
            message: `Your account has been ${status}`,
        };

        // Update the unseennotifications array in the users table using array_append to add the new notification
        const updateUnseenNotificationsQuery = 'UPDATE users SET unseennotification = array_append(unseennotification, $1) WHERE user_id = $2';
        await pool.query(updateUnseenNotificationsQuery, [JSON.stringify(notificationData), user_id]);

        // Send success message along with user data in response
        const responseData = {
            message: 'Stylist status updated successfully',
            success: true,
            data: userData, // Include user data in the response
        };
        res.status(200).send(responseData);
    } catch (err) {
        console.error("Error updating notifications:", err);
        res.status(500).send({ message: 'Internal Server Error', success: false, error: err });
    }
});

module.exports = router;
