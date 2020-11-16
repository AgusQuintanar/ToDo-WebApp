const handleGetTasks = (req, res, db) => {

	db.raw(
		"SELECT * FROM atd_sch.TASK WHERE idUser = "+ req.query.idUser+";"
	)
		.then((data) => {
			res.json(data[0]);
		})
		.catch((err) =>
			res.status(400).json("error while fetching tasks" + err)
		);
};

module.exports = {
	handleGetTasks,
};
