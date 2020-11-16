const handleGetLists = (req, res, db) => {
	const { idUser } = req.body;
	if (!req.body) return res.status(400).json("User ID requiered.");
	db.raw(
		"SELECT * FROM atd_sch.LIST WHERE idUser = "+ idUser +";"
	)
		.then((data) => {
			res.json(data[0]);
		})
		.catch((err) =>
			res.status(400).json("error while fetching lists" + err)
		);
};

module.exports = {
	handleGetLists,
};
