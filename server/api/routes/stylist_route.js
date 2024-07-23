const express = require('express');
const router = express.Router();
const pool = require('../../database');
const bodyParser = require('body-parser');
const authmiddleware = require('../../middleware/authmiddleware')

router.use(bodyParser.json());

// Apply the authenticateToken middleware to this route
router.post("/stylist-info", authmiddleware, async (req, res) => {
    try {
        // Get email from the request body
        const userEmail = req.user.email;

        // Query the Hairstylists table to get hairstylist_id and other data based on email
        const stylistUserQuery = `SELECT hairstylist_id, fullname, phone, email, country, specialization, experience, address, hairstyle_fees, timing, bio, image_data FROM Hairstylists WHERE email = $1`;

        // Execute the query
        const result = await pool.query(stylistUserQuery, [userEmail]);

        if (result.rows.length === 0) {
            // No hairstylist found for the email
            return res.status(404).send({ message: 'Stylist not found for the given email', success: false });
        }

        const stylistUser = result.rows[0];

        // Send success message in response
        res.status(200).send({ message: 'Stylist Info Fetched Successfully', success: true, data: stylistUser });
    } catch (error) {
        console.error('Error getting Stylist Info:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});

router.post("/update-stylist-info", authmiddleware, async (req, res) => {
    try {
        // Get email from the request body
        const userEmail = req.user.email;

        // Query to update the Hairstylists table based on email
        const updateStylistUserQuery = `
            UPDATE Hairstylists 
            SET fullname = $1, phone = $2, country = $3, specialization = $4, 
                experience = $5, address = $6, hairstyle_fees = $7, timing = $8, bio = $9, image_data = $10
            WHERE email = $11
            RETURNING *;`;

        // Extract data from the request body
        const { fullname, phone, country, specialization, experience, address, hairstyle_fees, timing, bio, image_data } = req.body;

        // Execute the query with the extracted data
        const result = await pool.query(updateStylistUserQuery, [
            fullname,
            phone,
            country,
            specialization,
            experience,
            address,
            hairstyle_fees,
            timing,
            bio, 
            image_data,
            userEmail, 
        ]);

        if (result.rows.length === 0) {
            // No hairstylist found for the email
            return res.status(404).send({ message: 'Stylist not found for the given email', success: false });
        }

        const updatedStylistUser = result.rows[0];

        // Send success message with updated data in response
        res.status(200).send({ message: 'Stylist Info Updated Successfully', success: true, data: updatedStylistUser });
    } catch (error) {
        console.error('Error updating Stylist Info:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});

router.post("/stylist-info-by-hairstylist-id", authmiddleware, async (req, res) => {
    try {
        // Get hairstylist_id from the request body
        const { hairstylist_id } = req.body;

        // Query the Hairstylists table to get hairstylist info based on hairstylist_id
        const stylistQuery = `SELECT hairstylist_id, fullname, phone, email, country, specialization, experience, address, hairstyle_fees, timing, bio, image_data FROM Hairstylists WHERE hairstylist_id = $1`;

        // Execute the query
        const result = await pool.query(stylistQuery, [hairstylist_id]);

        if (result.rows.length === 0) {
            // No hairstylist found for the hairstylist_id
            return res.status(404).send({ message: 'Stylist not found for the given hairstylist_id', success: false });
        }

        const stylistUser = result.rows[0];

        // Send success message in response
        res.status(200).send({ message: 'Stylist Info Fetched Successfully', success: true, data: stylistUser });
    } catch (error) {
        console.error('Error getting Stylist Info:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});


router.get('/get-all-booking-by-hairstylist_id', authmiddleware, async (req, res) => {
    try {
        // Get the authenticated user's email from the request
        const userEmail = req.user.email;

        // Query to find the hairstylist using the userEmail
        const stylistQuery = 'SELECT * FROM Hairstylists WHERE email = $1';
        const stylistResult = await pool.query(stylistQuery, [userEmail]);

        // Check if hairstylist exists
        if (stylistResult.rows.length === 0) {
            return res.status(404).send({ message: 'Stylist not found', success: false });
        }

        // Get the hairstylist_id from the query result
        const hairstylistId = stylistResult.rows[0].hairstylist_id;

        // Query to fetch all bookings by hairstylist_id
        const bookingsQuery = 'SELECT * FROM bookings WHERE hairstylist_id = $1';
        const bookingsResult = await pool.query(bookingsQuery, [hairstylistId]);

        // Send the bookings data in the response
        res.status(200).send({
            message: 'Bookings retrieved successfully',
            success: true,
            data: bookingsResult.rows,
        });
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});


router.post("/update-booking-status", authmiddleware, async (req, res) => {
    try {
        // Get the booking_id, status, and user_id from req.body
        const { booking_id, status } = req.body;

        // Check if the status value is valid based on the constraint conditions
        const validStatusValues = ["APPROVED", "PENDING", "REJECTED"]; 
        if (!validStatusValues.includes(status)) {
            return res.status(400).send({ message: "Invalid status value", success: false });
        }

        // Update the status of the booking in the bookings table
        const updateStatusQuery = 'UPDATE bookings SET status = $1 WHERE booking_id = $2';
        await pool.query(updateStatusQuery, [status, booking_id]);

        // Fetch the user_id associated with the booking_id
        const getUserIdQuery = 'SELECT user_id FROM bookings WHERE booking_id = $1';
        const userIdResult = await pool.query(getUserIdQuery, [booking_id]);
        const { user_id } = userIdResult.rows[0];

        // Construct notification data for the user
        const notificationData = {
            type: "booking_status_updated",
            message: `Your booking status has been updated to ${status}`,
        };

        // Fetch the current UnseenNotification array for the user
        const getUnseenNotificationQuery = 'SELECT UnseenNotification FROM users WHERE user_id = $1';
        const unseenNotificationResult = await pool.query(getUnseenNotificationQuery, [user_id]);
        const currentUnseenNotification = unseenNotificationResult.rows[0].unseennotification || [];

        // Update the UnseenNotification array in the users table for the specific user
        const updatedUnseenNotification = [...currentUnseenNotification, notificationData];
        const updateUnseenNotificationQuery = 'UPDATE users SET UnseenNotification = $1 WHERE user_id = $2';
        await pool.query(updateUnseenNotificationQuery, [updatedUnseenNotification, user_id]);

        // Send success message
        res.status(200).send({ message: 'Booking status updated successfully', success: true });
    } catch (err) {
        console.error("Error updating booking status:", err);
        res.status(500).send({ message: 'Internal Server Error', success: false, error: err });
    }
});


router.get("/review-by-hairstylist-id", authmiddleware, async (req, res) => {
    try {
        // Get hairstylist_id from the request body
        const { hairstylist_id } = req.body;

        // Query the Hairstylists table to get hairstylist info based on hairstylist_id
        const reviewQuery = `SELECT * FROM reviews WHERE hairstylist_id = $1`;

        // Execute the query
        const result = await pool.query(reviewQuery, [hairstylist_id]);

        if (result.rows.length === 0) {
            // No hairstylist found for the hairstylist_id
            return res.status(404).send({ message: 'No review found for the given hairstylist', success: false });
        }

        const review = result.rows[0];

        // Send success message in response
        res.status(200).send({ message: 'Review Fetched Successfully', success: true, data: review });
    } catch (error) {
        console.error('Error getting Stylist Info:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});



module.exports = router;
