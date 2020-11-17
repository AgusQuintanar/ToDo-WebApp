const handleRegisterUser = (req, res, db) => {
    const { firstName, lastName, birthday, email, password } = req.body;

    db("USER")
        .insert({
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            email: email,
            password: password
        })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => res.status(400).json("Can not register user."));
};

module.exports = {
    handleRegisterUser
};
