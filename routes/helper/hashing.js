const bcrypt = require('bcrypt');
require('dotenv').config();

async function hashing(contrasena) {
    const ci2 = process.env.CICLOSPS;
    return new Promise((resolve, reject) => {
        bcrypt.hash(contrasena, parseInt(ci2), (error, hash) => {
            if (error) {
                reject(error);
            } else {
                resolve(hash);
            }
        });
    });
}

async function compare_hash(contrasena_clean, contrasena_hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(contrasena_clean, contrasena_hash, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {hashing , compare_hash}


