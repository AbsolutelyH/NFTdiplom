const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Пожалуйста, скажите как вас зовут"],
        maxlength: [40, "Длинна названия максимум 40 символов"],
        minlength: [5, "Минимальная длинна названия 5 символов"],
    },
    email: {
        type: String,
        required: [true, "Пожалуйста, укажите почту"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Пожалуйста, укажите правильную почту"]
    },
    post:{
        type: String,
    },
    organization:{
        type: String,
    },
    about:{
        type: String,
    },
    website:{
        type: String,
    },
    vk:{
        type: String,
    },
    telegram:{
        type: String,
    },
    youtube:{
        type: String,
    },
    photo: {
        type: String,
    },
    background: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "creator", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Пожалуйста, укажите пароль"],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Пожалуйста, подтвердите пароль"],
        validate:{ 
            validator: function(el){
            return el === this.password; 
        },
        message: "Пароли не совпадают",
        },
    },
    walletAdress: {
        type: String,
        required: [true, "Пожалуйста, укажите адрес"],
        unique: true,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

userSchema.pre("save", function(next){
    if(!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function(next) {
    this.find({active: {$ne: false}});
    next();
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
){
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStep = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
        );
        return JWTTimestamp < changedTimeStep;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    console.log({resetToken}, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;