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



// Start of Retrieve all users (Admin only)
module.exports.getAllUsers = (userData) => {

	return User.findById(userData.id).then(result => {

		if(result.isAdmin === true) {
			return User.find({isAdmin:false}, "_id firstName lastName email mobileNo isAdmin").then(result => {

				if(result.length > 0) {

					
					return result
				} else{

					return 'User in empty'
				}
			})
		} else {

			return 'Only admin can retrieve all users'
		}
	})
}
// End of Retrieve all users (Admin only)



// Start of Retrieving the details of a user.
module.exports.getProfile = (userData) => {

	return User.findById(userData.id).then(result => {

		result.password = "";
		return result

	})
}
// End of Retrieving the details of a user.



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



// Start of Setting user as admin (Admin only)
module.exports.setAdmin = (data) => {

	return User.findById(data.userId).then(result => {

		if(data.isAdmin === true) {

			if(result.isAdmin === true) {

				return 'User is already admin'
			}

			result.isAdmin = true;

			return result.save().then((setAdmin ,error) => {

				if(error) {

					return 'User failed to make admin'
				} else {

					return 'User become admin succesfully'
				}
			})
		} else {

			return 'Authorized admin only'
		}
	}).catch(error => {

		return 'Sorry, something went wrong please try again.'
	})
}
// End of Setting user as admin (Admin only)



// Start of Setting admin as user (Admin only)
module.exports.removeAdmin = (data) => {

	return User.findById(data.userId).then(result => {

		if(data.isAdmin === true) {

			if(result.isAdmin === false) {

				return 'Already a user'
			}

			result.isAdmin = false;

			return result.save().then((removedAdmin ,error) => {

				if(error) {

					return 'Failed to remove as admin'
				} else {

					return 'Successfully remove as admin'
				}
			})
		} else {

			return 'Authorized admin only'
		}
	}).catch(error => {

		return 'Sorry, something went wrong please try again.'
	})
}
// End of Setting admin as user (Admin only)






















// Start of Non-admin User checkout (Create Order)
module.exports.checkoutProduct = (userData, requestBody) => {

	return User.findById(userData.id).then(result => {

		if(result.isAdmin === true) {

			return 'Only user can order'
		} else {


		}
	})
}
// End of Non-admin User checkout (Create Order)