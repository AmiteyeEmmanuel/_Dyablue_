const express = require('express');
const router = express.Router();
const pool = require('../../database');
const bodyParser = require('body-parser');
const authmiddleware = require('../../middleware/authmiddleware')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage });


router.use(bodyParser.json());


// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { fullname, phone, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertDataQuery = `
            INSERT INTO users (fullname, phone, email, password) 
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        const values = [fullname, phone, email, hashedPassword];
        const result = await pool.query(insertDataQuery, values);

        // Generate JWT token
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({ message: 'User registered successfully', user: result.rows[0], success: true });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const getUserQuery = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(getUserQuery, [email]);
        if (result.rows.length === 0) {
            res.status(400).send({ message: 'Email not found', success: false });
        } else {
            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                // Generate JWT token
                const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true });
                res.status(200).send({ message: 'Login successful', success: true, data: token });
            } else {
                res.status(400).send({ message: 'Incorrect password', success: false });
            }
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});


router.post("/user-info", authmiddleware, async (req, res) => {
    try {
        // Get email from the request body
        const userEmail = req.user.email;

        // Query the Hairstylists table to get hairstylist_id and other data based on email
        const UserQuery = `SELECT user_id, fullname, phone, email FROM users WHERE email = $1`;

        // Execute the query
        const result = await pool.query(UserQuery, [userEmail]);

        if (result.rows.length === 0) {
            // No user found for the email
            return res.status(404).send({ message: 'User not found for the given email', success: false });
        }

        const User = result.rows[0];

        // Send success message in response
        res.status(200).send({ message: 'User Info Fetched Successfully', success: true, data: User });
    } catch (error) {
        console.error('Error getting User Info:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});

router.post('/stylistform', upload.single('file'), async (req, res) => {
    try {
        const {
            fullname, phone, email, country, specialization,
            experience, address, hairstyle_fees, timing, bio
        } = req.body;

        const image_data = req.file ? req.file.buffer : null;

        // // Log the values for debugging
        // console.log('Inserting values:', {
        //     fullname, phone, email, country, specialization,
        //     experience, address, hairstyle_fees, timing, bio, image_data
        // });

        const insertDataQuery = `
            INSERT INTO Hairstylists (fullname, phone, email, country, specialization, experience, address, hairstyle_fees, timing, bio, image_data) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *`;
        const values = [fullname, phone, email, country, specialization, experience, address, hairstyle_fees, timing, bio, image_data];

        const result = await pool.query(insertDataQuery, values);

        // Update UnseenNotification in users table for admin users
        const updateUnseenNotificationQuery = `
            UPDATE users
            SET UnseenNotification = array_append(UnseenNotification, $1)
            WHERE isadmin = true`;
        const notificationData = {
            user_id: req.body.userId,
            name: req.body.fullname,
            message: `New stylist ${fullname} registered successfully.`
        };
        await pool.query(updateUnseenNotificationQuery, [notificationData]);

        res.status(200).send({ message: 'Stylist registered successfully', stylist: result.rows[0], success: true });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send({ message: 'Internal Server Error', success: false, error: err });
    }
});


router.get('/all-approved-stylist', authmiddleware, async (req, res) => {
    try {
        // Query to fetch all approved hairstylists
        const getAllApprovedHairstylistsQuery = `SELECT * FROM Hairstylists WHERE status = 'APPROVED'`;

        // Execute the query
        const result = await pool.query(getAllApprovedHairstylistsQuery);

        // Send the approved hairstylist data in the response
        res.status(200).send({ message: 'Approved Hairstylists retrieved successfully', hairstylists: result.rows, success: true });
    } catch (error) {
        console.error('Error getting all approved hairstylists:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});


// Apply the authenticateToken middleware to this route
router.post("/updateNotifications", authmiddleware, async (req, res) => {
    try {
        // Get fullname from the request body
        const userEmail = req.user.email;

        // Query the users table to fetch user_id based on email
        const getUserIdQuery = `SELECT user_id FROM users WHERE email = $1`;
        const result = await pool.query(getUserIdQuery, [userEmail]);

        if (result.rows.length > 0) {
            const user_id = result.rows[0].user_id;

            // Update UnseenNotification to ReceivedNotification and clear UnseenNotification
            const updateNotificationsQuery = `
                UPDATE users
                SET 
                    "receivednotification" = COALESCE("receivednotification", ARRAY[]::text[]) || "unseennotification",
                    "unseennotification" = ARRAY[]::text[]
                WHERE 
                   "user_id" = $1
                RETURNING *`; // Include RETURNING * to get the updated data

            const updateResult = await pool.query(updateNotificationsQuery, [user_id]);

            if (updateResult.rows.length > 0) {
                const updatedUser = updateResult.rows[0];
                // Remove sensitive data like password before sending the response
                delete updatedUser.password;
                res.status(200).send({ message: 'Notifications updated successfully', success: true, data: updatedUser });
            } else {
                res.status(404).send({ message: 'User not found or not an admin', success: false });
            }
        } else {
            res.status(404).send({ message: 'User not found', success: false });
        }
    } catch (err) {
        console.error("Error updating notifications:", err);
        res.status(500).send({ message: 'Internal Server Error', success: false, error: err });
    }
});


router.post("/clearNotifications", authmiddleware, async (req, res) => {
    try {
        // Get userEmail from the authenticated user
        const userEmail = req.user.email;

        // Query the users table to fetch user_id based on email
        const getUserIdQuery = `SELECT user_id FROM users WHERE email = $1`;
        const userResult = await pool.query(getUserIdQuery, [userEmail]);

        if (userResult.rows.length > 0) {
            const user_id = userResult.rows[0].user_id;

            // Clear both UnseenNotification and ReceivedNotification arrays
            const clearNotificationsQuery = `
                UPDATE users
                SET 
                    "unseennotification" = '{}'::text[],
                    "receivednotification" = '{}'::text[]
                WHERE 
                    "user_id" = $1`;

            const clearResult = await pool.query(clearNotificationsQuery, [user_id]);

            console.log('Affected rows:', clearResult.rowCount); // Log the number of affected rows

            if (clearResult.rowCount > 0) {
                res.status(200).send({ message: 'Notifications cleared successfully', success: true });
            } else {
                res.status(404).send({ message: 'User not found or not an admin', success: false });
            }
        } else {
            res.status(404).send({ message: 'User not found', success: false });
        }
    } catch (err) {
        console.error("Error clearing notifications:", err);
        res.status(500).send({ message: 'Internal Server Error', success: false, error: err });
    }
});

router.post("/book-appointment-spot", authmiddleware, async (req, res) => {
    try {
        const { user_id, email, hairstylist_id, user_info, stylist_info, date, time } = req.body;
        const status = "PENDING"; // Set the status to "PENDING"
        const formatted_date = moment(date, "YYYY-MM-DD").toISOString();
        const formatted_time = moment(time, "HH:mm").toISOString();
        // Create a new booking with the formatted date and time
        const newBookingQuery = `
            INSERT INTO bookings (user_id, email, hairstylist_id, user_info, stylist_info, date, time, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`;
        const values = [user_id, email, hairstylist_id, user_info, stylist_info, formatted_date, formatted_time, status];
        const newBookingResult = await pool.query(newBookingQuery, values);
        const newBooking = newBookingResult.rows[0];

        // Find the hairstylist by ID
        const hairstylistQuery = 'SELECT * FROM Hairstylists WHERE hairstylist_id = $1';
        const hairstylistValues = [hairstylist_id];
        const hairstylistResult = await pool.query(hairstylistQuery, hairstylistValues);
        const hairstylist = hairstylistResult.rows[0];

        if (hairstylist && hairstylist.isHairstylist) {
            const notificationData = {
                type: "new appointment request",
                message: `A new appointment request has been made by ${user_info.fullname}`,
                onClickPath: "/stylist/appointments",
            };
            const updateNotificationsQuery = 'UPDATE users SET unseennotifications = array_append(unseennotifications, $1) WHERE user_id = $2';
            const updateValues = [JSON.stringify(notificationData), user_id];
            await pool.query(updateNotificationsQuery, updateValues);
        }

        res.status(200).send({ message: 'Appointment booked successfully', success: true, data: newBooking });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).send({ message: 'Error booking appointment', success: false, error: error.message });
    }
});

router.post("/check-availability", authmiddleware, async (req, res) => {
    try {
        const { date, time, hairstylist_id } = req.body;
        const formatted_date = moment(date, "YYYY-MM-DD").toISOString();
        const start_time = moment(time, "HH:mm").subtract(3, 'hours').toISOString();
        const end_time = moment(time, "HH:mm").add(3, 'hours').toISOString();

        const query = `
            SELECT * FROM bookings 
            WHERE hairstylist_id = $1 
            AND date = $2 
            AND time > $3 
            AND time < $4 
            AND status = 'APPROVED'`;

        const values = [hairstylist_id, formatted_date, start_time, end_time];
        const { rows } = await pool.query(query, values);

        if (rows.length > 0) {
            return res.status(200).send({ message: "Appointment not available", success: false });
        } else {
            res.status(200).send({ message: 'Appointment available', success: true });
        }
    } catch (error) {
        console.error("Error checking appointment availability:", error);
        res.status(500).send({ message: 'Error checking appointment availability', success: false, error: error.message });
    }
});

router.get('/get-booking-by-email', authmiddleware, async (req, res) => {
    try {
        const { email } = req.user;

        // Query to fetch bookings by user_id
        const getBookingQuery = 'SELECT * FROM bookings WHERE email = $1';


        // Execute the query with user_id parameter
        const result = await pool.query(getBookingQuery, [email]);

        // Send the booking data in the response
        res.status(200).send({ message: 'Bookings retrieved successfully', data: result.rows, success: true });
    } catch (error) {
        console.error('Error getting bookings:', error);
        res.status(500).send({ message: 'Internal Server Error', success: false, error });
    }
});

router.post('/update-user-info', async (req, res) => {
    try {
        const { fullname, phone, email, password } = req.user;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's information in the database
        const updateDataQuery = `
            UPDATE users 
            SET fullname = $1, phone = $2, password = $3
            WHERE email = $4
            RETURNING *`;
        const values = [fullname, phone, hashedPassword, email];
        const result = await pool.query(updateDataQuery, values);

        res.status(200).send({ message: 'User updated successfully', user: result.rows[0], success: true });
    } catch (error) {
        res.status(400).send({ message: 'Internal Server Error', success: false, error });
    }
})


router.post('/submit-review', authmiddleware, async (req, res) => {
    try {
        const { user_id, hairstylist_id, user_info, stylist_info, review_text, star_rating } = req.body;

        const newReviewQuery = `
            INSERT INTO reviews (user_id, hairstylist_id, user_info, stylist_info, review_text, star_rating)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;
        const values = [user_id, hairstylist_id, user_info, stylist_info, review_text, star_rating];
        const newReviewResult = await pool.query(newReviewQuery, values);
        const newReview = newReviewResult.rows[0];

        // Construct notification data for the hairstylist
        const notificationData = {
            type: "review_sent_successfully",
            message: `New review message from ${user_info.fullname}`,
        };

        // Fetch the current UnseenNotification array for the hairstylist
        const getUnseenNotificationQuery = 'SELECT UnseenNotification FROM users WHERE user_id = $1';
        const unseenNotificationResult = await pool.query(getUnseenNotificationQuery, [hairstylist_id]);
        const currentUnseenNotification = unseenNotificationResult.rows[0].unseennotification || [];

        // Update the UnseenNotification array in the users table for the hairstylist
        const updatedUnseenNotification = [...currentUnseenNotification, notificationData];
        const updateUnseenNotificationQuery = 'UPDATE users SET UnseenNotification = $1 WHERE user_id = $2';
        await pool.query(updateUnseenNotificationQuery, [updatedUnseenNotification, hairstylist_id]);

        res.status(200).send({ message: 'Review successfully sent', success: true, data: newReview });
    } catch (error) {
        console.error("Error sending review:", error);
        res.status(500).send({ message: 'Error sending review', success: false, error: error.message });
    }
});


module.exports = router;

