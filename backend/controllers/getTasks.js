const handleGetTasks = (req, res, db) => {
	const { idUser, idList } = req.body;
	if (!req.body) return res.status(400).json("User ID requiered.");
	if (!idList) {
		db.raw(
			"SELECT * FROM atd_sch.TASK WHERE idUser = "+ idUser +";"
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((err) =>
				res.status(400).json("error while fetching tasks" + err)
			);
	}

	else {
		db.raw(
			"SELECT * FROM atd_sch.TASK WHERE idUser = "+ idUser +" and idList = "+idList+";"
		)
			.then((data) => {
				res.json(data[0]);
			})
			.catch((err) =>
				res.status(400).json("error while fetching tasks" + err)
			);
	}
	
};

module.exports = {
	handleGetTasks,
};
