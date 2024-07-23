
const { Pool } = require("pg");
require('dotenv').config(); 

const pool = new Pool({
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    host: "cp30tdsf7o1s73bpgh9g-a.oregon-postgres.render.com",
    database: process.env.POSTGRES_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    }
});

const createUserData = `CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL PRIMARY KEY NOT NULL,
    fullname VARCHAR(200) NOT NULL,
    phone VARCHAR(200) UNIQUE NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    isHairstylist BOOLEAN DEFAULT FALSE,
    isAdmin BOOLEAN DEFAULT FALSE,
    ReceivedNotification TEXT[] DEFAULT '{}'::TEXT[],
    UnseenNotification TEXT[] DEFAULT '{}'::TEXT[]
);`;


const StylistData = `CREATE TABLE IF NOT EXISTS Hairstylists (
    hairstylist_id BIGSERIAL PRIMARY KEY,
    fullname VARCHAR(200) NOT NULL, 
    phone VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    country VARCHAR(200) NOT NULL,
    specialization VARCHAR(200) NOT NULL,
    experience VARCHAR(200) NOT NULL,
    address VARCHAR(200) NOT NULL,
    hairstyle_fees VARCHAR(200) NOT NULL,
    timing TEXT[] DEFAULT ARRAY[]::TEXT[],
    bio TEXT,
    image_data BYTEA,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'))
);`;




const BookingData = `CREATE TABLE IF NOT EXISTS bookings (
    booking_id BIGSERIAL PRIMARY KEY,
    user_id BIGSERIAL NOT NULL,
    email VARCHAR(255),
    hairstylist_id BIGSERIAL NOT NULL,
    user_info JSONB NOT NULL,
    stylist_info JSONB NOT NULL,
    date DATE NOT NULL, -- Changed to DATE type for date-only values
    time TEXT DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'))
);`;


const ReviewData = `CREATE TABLE IF NOT EXISTS reviews (
    review_id BIGSERIAL PRIMARY KEY,
    user_id BIGSERIAL NOT NULL,
    email VARCHAR(255),
    hairstylist_id BIGSERIAL NOT NULL,
    user_info JSONB NOT NULL,
    stylist_info JSONB NOT NULL,
    review_text VARCHAR(255),
    star_rating VARCHAR(255)
);`;


// pool.query(StylistData)
//     .then((res) => {
//         console.log("Table created");
//         console.log(res);
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = pool;
