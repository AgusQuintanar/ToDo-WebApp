const handleGetTask = (req, res, db) => {
	const { idTask } = req.body;
	if (!idTask) return res.status(400).json("Task ID requiered.");
	db.raw(
		"SELECT * FROM atd_sch.TASK WHERE idTask = "+ idTask +";"
	)
		.then((data) => {
			res.json(data[0][0]);
		})
		.catch((err) =>
			res.status(400).json("error while fetching tasks" + err)
		);
};

module.exports = {
	handleGetTask,
};
