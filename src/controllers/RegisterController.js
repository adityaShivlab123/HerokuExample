import {
    registerUser,
    sendotpService,
    VerifyOtpService,
    CreatePasswordService,
    LoginService
} from '../services/Registration.service';
import bcrypt from 'bcryptjs';
import { RegistrationModel } from '../models/registration.model';
import { GenerateToken } from '../middlewares/JsonWebToken';

// Register User Controller
const RegisterController = async (req, res) => {
    const { FirstName, LastName, Email, Mobile } = req.body;
    const Image = req.file.path;

    try {
        // Call Register User Service 
        const user = await registerUser(FirstName, LastName, Email, Mobile, Image)

        res.status(200).send({
            message: "User Created Successfully !",
            status: 200,
            data: user
        })

    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 400,
            data: {}
        })
    }
}

// Send-Otp Controller
const SendOtp = async (req, res) => {

    try {
        const email = req.email;

        const sentMail = await sendotpService(email);

        res.status(200).send({
            message: "Mail Sent Successfully !",
            status: 200,
            data: sentMail
        })

    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 400,
            data: {}
        })
    }
}

// Verify Otp Controller
const OtpVerification = async (req, res) => {

    try {
        const { otp } = req.body;

        const VerifyOtp = await VerifyOtpService(otp);

        res.status(200).send({
            message: "Account Verification Is Successfull !",
            status: 200,
            data: VerifyOtp
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 400,
            data: {}
        })
    }
}

// Create Password Controller
const CreatePassword = async (req, res) => {
    try {
        const { Password } = req.body;
        const email = req.email;

        const CreatePassword = await CreatePasswordService(Password, email)
        res.status(200).send({
            message: "Password Created Successfully !",
            status: 200,
            data: CreatePassword
        })

    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 400,
            data: {}
        })
    }
}

// Login Controller
const Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await RegistrationModel.findOne({ Email: Email })

        if (!user) {
            throw new Error("Please Enter Valid Email !")
        } else {
            const MatchPassword = bcrypt.compareSync(Password, user.Password)
            if (!MatchPassword) {
                throw new Error("Password is incorrect !")
            } else {
                res.status(200).send({
                    message: "Login Successfull !",
                    status: 200,
                    data: await GenerateToken(user)
                })
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

//Export All Controller Here
export {
    RegisterController,
    SendOtp,
    OtpVerification,
    CreatePassword,
    Login
}