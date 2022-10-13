const jwt = require("jsonwebtoken");
const secret = "e-commerceAPI";


//JSON Web Tokens

//Token Creation
module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	//Generate a token
	return jwt.sign(data, secret, {})

}



//Token Verification
module.exports.verify = (req, res, next) => {

	// The token is retrieved from the request header
	let token = req.headers.authorization

	// Token received and is not undefined
	if (typeof token !== "undefined" ) {

		token = token.slice(7, token.length);

		// Validate the token using the "verify" method decrypting the token using the secret code
		return jwt.verify(token, secret, (err, data) => {

			// If JWT is not valid
			if(err) {
				return res.send({auth: "failed"})

			// If JWT is valid	
			} else {

				// Allows the application to proceed with the next middleware function/callback function in the route
				next();
			}

		})


	// Token does not exist
	} else {

		return res.send({auth: "failed"});
	}

}


//Token Decryption
module.exports.decode = (token) => {

	// Token received and is not undefined
	if (typeof token !== "undefined") {

		// Retrieves only the token and removes the "Bearer " prefix
		token = token.slice(7, token.length);


		return jwt.verify(token, secret, (err, data) => {

			if(err) {
				return null

			} else {

				return jwt.decode(token, {complete: true}).payload;
			}
		})

	// Token does not exist
	} else {

		return null
	}
}
