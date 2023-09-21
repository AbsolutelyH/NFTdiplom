const crypto = require("crypto");
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError")
const sendEmail = require("../Utils/email");
const ethers = require('ethers');


//CREATE TOKEN AND SIGN TOKEN
const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIR_IN * 24 * 60 * 60 * 1000),
       // secure: true,
        httpOnly: true,
    }
    //if(process.env.NODE_ENV= "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status: "Success",
        token,
        data: {
            user,
        },
    });
}

//SIGNUP
exports.signup = catchAsync (async (req, res, next) => {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
});

//LOGIN USER
exports.login = catchAsync (async(req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return next(new AppError("Пожалуйста, укажите вашу почту и пароль"));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError("Направильная почта или пароль", 401));
    }
    createSendToken(user, 200, res);
});

//PROTECTING DATA
exports.protect = catchAsync(async (req,res,next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new AppError("Вы не вошли, чтобы получить доступ", 401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if(!currentUser) {
        return next(
            new AppError("Пользователь, которому принадлежит этот токен больше не существует", 401)
        );
    }

    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(
            new AppError("Пользователь недавно сменил пароль", 401)
        )
    };
    req.user = currentUser
    next();
});

exports.restrictTo = (...roles) => {
    return(req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new AppError("У вас нет доступка", 403)
            )
        }
        next();
    };
};

//FORGT PASSWORD
exports.forgotPassword = catchAsync(async(req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new AppError("Пользователя с этой почтой не существует", 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});

    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and confirmPassword to: ${resetURL}.\n If didnt forget your password, please ignore this email`;
    
    try{
        await sendEmail({
            email: user.email,
            subject: "Your Password reset token (Valid for 10 min)",
            message,
        });
        res.status(200).json({
            status: "success",
            message: "Token sent to email",
        });
    }catch(error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});
        return next(
            new AppError("There was an error sending the email, Try again later", 500)
        );
    }
    
});

//RESET PASSWORD
exports.resetPassword = catchAsync(async(req, res, next) => {
    const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()},
    });
    if(!user) {
        return next(new AppError("Token is invalid or has expired", 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, res);
});

//UPDATING PASSWORD
exports.updatePassword = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))){
        return next(new AppError("Your current password is wrong", 401));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    createSendToken(user, 200, res);
});

//USER NFT CREATION VALIDATION
exports.signNFT = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user._id);
    //console.log(user);
    if(user.role !== "creator") {
        return next(new AppError("У вас нет права создавать NFT", 400));
    }
        const privateKey = process.env.PRIVAT_SMARTCONTRACT_KEY;
    
        const signer = new ethers.Wallet(privateKey);

        // Get first allowlisted address
        let message = user.walletAdress;
        //console.log("allowlistedAddresses: ", message);
        // Compute hash of the addres
    
        let messageHash = ethers.utils.id(message);
        //console.log("Message Hash: ", messageHash);
    
        // Sign the hashed address
        let messageBytes = ethers.utils.arrayify(messageHash);
        let signature = await signer.signMessage(messageBytes);
        //console.log("Signature: ", signature);
        res.status(200).json({
            status: "success",
            data: {
                messageHash: messageHash,
                signature: signature,
            },
        })
});

//authMe
exports.authMe = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user._id);
    if(!user) {
        return next(new AppError("Пользователь не найден", 404));
    }
        res.status(200).json({
            status: "success",
            data: {
                user: user,
            },
        })
});

//UPDATING USER FPROFILE DATA
