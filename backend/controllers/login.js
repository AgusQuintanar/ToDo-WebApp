const handleLogin = (req, res, db) => {
	const { email, password } = req.body;
    db.
    select("email", "password", "idUser")
		.from("USER")
		.where("email", "=", email)
		.then((user) => {
            if (password === user[0].password) {
                return res.json(user[0].idUser);
            } else {
                res.status(400).json(-1);
            }
			
		})
		.catch((err) => res.status(400).json("Error"));
};

module.exports = {
	handleLogin,
};
