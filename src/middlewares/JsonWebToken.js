import jwt from 'jsonwebtoken';
require('dotenv').config();
import { RegistrationModel } from '../models/registration.model';
import { logger } from '../logger/Logger';

//Generate The JWT Token 
const GenerateToken = async (payload) => {

    try {
        var token = jwt.sign({ payload }, process.env.SECRET, {
            expiresIn: 3600000 // expires in 1 hours
        });
        return token
    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 400,
            data: {}
        })
    }
};

// Send Mail If User Filled The Info
const EmailVerification = async (req, res, next) => {

    try {
        var token = req.headers['access-token-otp'];

        if (!token) {
            throw new Error("No Token Provided !");
        } else {
            const decodeToken = jwt.verify(token, process.env.SECRET)
            const email = decodeToken.payload.Email

            const findEmail = await RegistrationModel.findOne({ Email: email })

            if (!findEmail) {
                throw new Error("This User Is Not Registered !")
            } else {
                req.email = email;
                next();
            }
        }
    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 400,
            data: {}
        })
    }
}

// For Account Verification Done Or Not
const IsVerifyAcoount = async (req, res, next) => {

    try {
        var token = req.headers['access-token-password'];
        if (!token) {
            throw new Error("No Token Provided !");
        } else {
            let decodeToken = jwt.verify(token, process.env.SECRET)

            const email = decodeToken.payload.Email
            req.email = email;

            const FindEmail = await RegistrationModel.findOne({ Email: email })

            const IsActive = FindEmail.IsActive


            if (IsActive == true) {
                next();
            } else {
                throw new Error("Please Verify Your Account First !")
            }
        }
    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 400,
            data: {}
        })
    }
}

// For Password Is Created Or Not
const IsPasswordCreated = async (req, res, next) => {
    try {
        const token = req.headers['login-token'];

        if (!token) {
            throw new Error("No Token Provided !");
        } else {
            let decodeToken = jwt.verify(token, process.env.SECRET)
            const email = decodeToken.payload.Email

            const user = await RegistrationModel.findOne({ Email: email })

            const password = user.Password;
            logger.info({ "password from middle : ": password });

            if (password == null) {
                throw new Error("For Login You Need To Create Password !")
            } else {
                next();
            }
        }

    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 400,
            data: {}
        })
    }
}

export { GenerateToken, EmailVerification, IsVerifyAcoount, IsPasswordCreated }