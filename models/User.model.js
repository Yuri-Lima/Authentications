const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            trim: true
        },
        approval: {
            type: String,
            trim: true,
            default: 'Pending'
        },
        loginCount: {
            type: Number,
            trim: true,
            default: 0
        },
        lastLoginAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// userSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt()
// 	const user = this;

// 	if (user.isModified('password')) {
// 		user.password = await bcrypt.hash(user.password, salt);
// 	}

// 	next();
// });

// static methods
// userSchema.statics.login = async function (email, password) {
// 	let user = await this.findOne({ email });

// 	if (user) {
// 		if (!user.password) {
// 			throw Error('No password set, try with social provider');
// 		}

// 		const auth = await bcrypt.compare(password, user.password);

// 		if (auth) {
// 			user.loginCount = user.loginCount + 1;
// 			user.lastLoginAt = new Date();
// 			await user.save();

// 			console.log("User", user);

// 			return user;
// 		}

// 		throw Error('Password is incorrect');
// 	}

// 	throw Error('Email is incorrect');
// };

userSchema.statics.add = async function (userProps) {
    try {
        const user = await this.create(userProps.data);
        if (user) {
            // send welcome email
            const message = {
                to: `${user.firstName}${user.lastName} <${user.email}>`,
                subject: 'Welcome to SBadmin Site',
                text: `Hi ${user.firstName}${user.lastName}, welcome to SBadmin Site! You've signed up with email ${user.email}`,
                html: `<p>Hi <strong>${user.firstName}${user.lastName}</strong>,</p><p>Welcome to SBadmin Site! You've signed up with email ${user.email}</p>`
            };
            
            return ('success!');
            // sendEmail(message);
        }

    } catch(e){
        console.log(e) 
        throw Error('Account cannot be created');
    }

};

userSchema.statics.findByIdAndUpdatePassword = async function (
	userId,
	password
) {
	let user = await this.findById(userId);

	if (user) {
		user.password = password;
		user.retrieveToken = undefined;
		await user.save();

		return user;
	}

	throw Error('User cannot be found');
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
