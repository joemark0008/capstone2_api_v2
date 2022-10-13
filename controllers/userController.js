const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth')


// Start of User registration
module.exports.registerUser = (requestBody) => {

	return User.find({email:requestBody.email}).then(result => {

		if (result.length > 0) {
			return 'Your email is already registed!'
		} else {

			let newUser = new User({
				firstName: requestBody.firstName,
				lastName: requestBody.lastName,
				email: requestBody.email,
				mobileNo: requestBody.mobileNo,
				password: bcrypt.hashSync(requestBody.password, 10)
			})

			return newUser.save().then((user, error) => {

				if(error) {

					return false
				} else {

					return 'Your registration has been successfully completed!'
				}
			})
		}
	})
}
// End of User registration

// Start of User Authentication
module.exports.loginUser = (requestBody) => {

	return User.findOne({email: requestBody.email}).then(result => {

		if(result == null) {
			return 'User not found'
		} else {

			const isPasswordCorrect = bcrypt.compareSync(requestBody.password, result.password);


			if(isPasswordCorrect) {
				return {access: auth.createAccessToken(result)}
			} else {
				return false
			}
		}
	})
}
// End of User Authentication