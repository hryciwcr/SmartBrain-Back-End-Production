const handleSignin = (req, res, db, bcrypt) => {

	const { email, password } = req.body;
	if (!email || !password) { //Check that the user didn't enter empty strings for name, email, password. If either email, name, or password, ! will cause them to evaluate to true and execute this if statement
		return res.status(400).json('incorrect submission');
	}


	// if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
	// 	res.json(database.users[0]);
	// } else {
	// 	res.status(400).json('error logging in');
	// }
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				db.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
						res.json(user[0]);
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))

}

module.exports = {
	handleSignin: handleSignin
}