import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

// User Registration Model
const Registration = mongoose.Schema({

    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    Mobile: { type: Number, required: true },
    Image: { type: String, required: true },
    VerificationCode: { type: Number, default: null, required: false },
    Password: { type: String, default: null, required: false },
    IsActive: { type: Boolean, default: false }

}, { timestamps: true, versionKey: false });

//Static Function
Registration.statics.FindOne = async (query) => {
    try {
        return await RegistrationModel.findOne(query);
    } catch (error) {
        return { error: error };
    }
};

const RegistrationModel = mongoose.model('Registration', Registration);
export { RegistrationModel }