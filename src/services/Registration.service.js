import { RegistrationModel } from '../models/registration.model';
import { sMail } from './SendMail.service';
import { GenerateToken } from '../middlewares/JsonWebToken';
import bcrypt from 'bcryptjs';
import { generateOTP } from '../utils/GenerateOtp';
import { logger } from '../logger/Logger';

//Register User Service
const registerUser = async (FirstName, LastName, Email, Mobile, Image) => {

    const AddUser = new RegistrationModel({
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Mobile: Mobile,
        Image: Image
    })

    const FindUser = await RegistrationModel.FindOne({ Email: Email })

    if (!FindUser) {
        const saveUserData = await AddUser.save();
        if (!saveUserData) {
            throw new Error("Something Went Wrong !")
        } else {
            const payload = { FirstName, LastName, Email, Mobile, Image }
            const Token = await GenerateToken(payload)
            return Token
        }
    }
    else {
        throw new Error("This User Is Already Exist !")
    }
}

// Send-Otp Service
const sendotpService = async (email) => {
    const VerificationCode = generateOTP();
    logger.info({ "OTP :": VerificationCode });

    const subject = "Account Verification !"
    const html = `<h4> Welcome to this site, please verify your account with 
                    this verification OTP : ${VerificationCode} </h4>
                    <h4>OTP will expires in 5 mins !</h4>`

    const filter = { Email: email }
    const update = { VerificationCode: VerificationCode }

    const Otp = await RegistrationModel.findOneAndUpdate(filter, update)

    if (!Otp) {
        throw new Error("Can't Send The OTP !")
    } else {

        await Otp.save();
        const Mail = sMail(email, subject, html);

        return Mail
    }
}

//Verify-Otp Service
const VerifyOtpService = async (otp) => {
    const filter = { VerificationCode: otp }
    const update = { IsActive: true }

    const VerifyOtp = await RegistrationModel.findOneAndUpdate(filter, update, { new: true })

    if (!VerifyOtp) {
        throw new Error("OTP is not valid !")
    }
}

//Create Password Service
const CreatePasswordService = async (Password, email) => {
    const hash = await bcrypt.hash(Password, 5);

    const filter = { Email: email }
    const update = { Password: hash }

    const CreatePassword = await RegistrationModel.findOneAndUpdate(filter, update)

    if (!CreatePassword) {
        throw new Error("Something Went Wrong !")
    }
}

//Exports All The Above Services Here
export {
    registerUser,
    sendotpService,
    VerifyOtpService,
    CreatePasswordService,
}