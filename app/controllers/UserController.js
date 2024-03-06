// Import User Model Schema
const User = require('../models/User');
const crypto = require('crypto');
const vonage = require('../common/initVonage');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config.json');


// Create a new user
const createUser = async (req, res) => {
    try {
        // Extract the required fields from the request body
        const {
            username,
            password,
            name,
            lastname,
            address,
            phone,
            confirm_code,
            type,
            verification_code_change_password,
            privacy,
            isUserVerified
        } = req.body;

        const saltRounds = 10; // Numero di iterazioni per Bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Genera la password hashata

        // Create a new user object using the model schema
        const user = new User({
            username,
            password: hashedPassword,
            name,
            lastname,
            address,
            phone,
            confirm_code,
            type,
            verification_code_change_password,
            privacy,
            isUserVerified
        });

        // Save the user to the database
        const savedUser = await user.save();

        // Send the saved user in the response
        if (savedUser) {
            res.status(200).json({message: 'User created successfully'});
        } else {
            res.status(500).json({error: 'Error creating user'});
        }
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        // Get all users from the database
        const users = await User.find();

        // Send the users in the response
        res.status(200).json(users);
    } catch (error) {
        // Handle errors
        console.error('Error getting users:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// Get a user by id
const getUserById = async (req, res) => {
    try {
        // Get the id from the request parameters
        const {id} = req.params;

        // Get the user from the database
        const user = await User.findById(id);

        // Send the user in the response
        res.status(200).json(user);
    } catch (error) {
        // Handle errors
        console.error('Error getting user by id:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// Update a user by id
const updateUserById = async (req, res) => {
    try {
        // Get the id from the request parameters
        const {id} = req.params;

        // Get the updated data from the request body
        const {
            username,
            name,
            lastname,
            address,
            phone,
            confirm_code,
            type,
            isUserVerified
        } = req.body;

        // Create a new user object
        const updatedUser = {
            username,
            name,
            lastname,
            address,
            phone,
            confirm_code,
            type,
            isUserVerified
        };

        // Update the user in the database
        const result = await User.findByIdAndUpdate(id, updatedUser);

        // Send the updated user in the response
        if (result) {
            res.status(200).json({message: 'User updated successfully'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        // Handle errors
        console.error('Error updating user by id:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// Delete a user by id
const deleteUserById = async (req, res) => {
    try {
        // Get the id from the request parameters
        const {id} = req.params;

        // Delete the user from the database
        const result = await User.findByIdAndDelete(id);

        // Send the deleted user in the response
        res.status(200).json(result);
    } catch (error) {
        // Handle errors
        console.error('Error deleting user by id:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// Verfiy a user by id
const verifyUserById = async (req, res) => {
    try {
        // Get the id from the request parameters
        const {id} = req.params;

        // Get user from the database
        const user = await User.findById(id);

        // Change the user status
        user.isUserVerified = true;

        // Update the user in the database
        const result = await User.findByIdAndUpdate(id, user);

        // Send the updated user in the response
        if (result) {
            res.status(200).json({message: 'User verified successfully'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        // Handle errors
        console.error('Error verifying user by id:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// Change password a user by id
const changePasswordUserById = async (req, res) => {
    try {
        // Get the id from the request parameters
        const {id} = req.params;

        // Get the updated data from the request body
        const {
            password,
            verification_code_change_password
        } = req.body;

        // Create a new user object
        const updatedUser = {
            password,
            verification_code_change_password
        };

        // Update the user in the database
        const result = await User.findByIdAndUpdate(id, updatedUser);

        // Send the updated user in the response
        if (result) {
            res.status(200).json({message: 'User password changed successfully'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        // Handle errors
        console.error('Error changing password user by id:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// Send SMS to user
const sendSMS = async (req, res) => {
    try {
        const from = "Conor shop"
        const to = req.body.numberPhone
        const verficationCode = generateRandomCode()
        const text = 'Your verification code is: ' + verficationCode

        // find user by phone number
        const user = await User.findOne({phone: to})

        const id = user._id.valueOf();

        // update confirm_code
        user.confirm_code = verficationCode.toString();
        console.log('************id user************');
        console.log(user._id.valueOf());

        // Update the user in the database
        await User.findByIdAndUpdate(id, user);

        async function sendSMSHandler() {
            await vonage.sms.send({to, from, text})
                .then(resp => {
                    console.log('Message sent successfully');
                    console.log(resp);
                })
                .catch(err => {
                    console.log('There was an error sending the messages.');
                    console.error(err);
                });
        }

        await sendSMSHandler();
        res.status(200).json({message: 'SMS sent successfully', verficationCode});
    } catch (error) {
        // Handle errors
        console.error('Error sending SMS:', error);
        res.status(500).json({error: 'Internal Server Error'});

    }
}

// Random code
function generateRandomCode() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get a token for a registered user
const getToken = async (req, res) => {
    debugger;
    try {
        const {username, password} = req.body;
        debugger;
        // Verifica se l'utente esiste nel database
        const user = await User.findOne({username});
        console.log('user', user);

        if (user) {
            console.log('hashedPassword', password);
            console.log('user.password', user.password);
            // Verifica la password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                console.log(passwordMatch);
                // Crea un token JWT
                const token = jwt.sign({
                        userId: user._id,
                        userName: user.username,
                        userType: user.type
                    }, config.secret_key, {expiresIn: config.TOKEN_LIFETIME}, {algorithm: 'RS256'},
                    (err, token) => {
                        if (err) {
                            console.error('Error while signing token:', err);
                            res.status(500).json({error: 'Internal Server Error'});
                            return;
                        }
                        return token;
                    });

                res.status(200).json({token});
            } else {
                res.status(401).json({error: 'Invalid password'});
            }
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        console.error('Error getting token:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    verifyUserById,
    changePasswordUserById,
    sendSMS,
    getToken
}


