import express from 'express';
const router = express.Router();
import {
    RegisterController,
    SendOtp,
    OtpVerification,
    CreatePassword,
    Login
} from '../controllers/RegisterController';
import { ValidationSchema } from '../validations/User.validation';
import { EmailVerification, IsVerifyAcoount, IsPasswordCreated } from '../middlewares/JsonWebToken';
import multerImage from '../utils/ImageUpload';
import LINK from '../utils/RouteLinks';

// Define Route Using Js Object
const { USER } = LINK;
const { REGISTER, SENDOTP, VERIFYOTP, CREATEPASSWORD, LOGIN } = USER;

//Define Endpoint Routes 

router.post(REGISTER, ValidationSchema, multerImage.upload.single('Image'), RegisterController)

router.post(SENDOTP, EmailVerification, SendOtp)

router.post(VERIFYOTP, OtpVerification)

router.post(CREATEPASSWORD, IsVerifyAcoount, CreatePassword)

router.post(LOGIN, IsPasswordCreated, Login)

export { router }