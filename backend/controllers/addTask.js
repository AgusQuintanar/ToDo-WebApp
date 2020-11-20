const handleAddTask = (req, res, db) => {
	const {
		text,
		completed,
		important,
		myDay,
		planned,
		datePlanned,
		description,
		idList,
		idUser
	} = req.body;

	db.transaction((trx) => {
		trx.insert({
			text: text,
			completed: completed,
			important: important,
			myDay: myDay,
			planned: planned,
			datePlanned: datePlanned,
			description: description,
			idList: idList,
			idUser: idUser,
		})
			.into("TASK")
			.returning("idTask")
			.then((idTask) => {
				console.log(idTask[0]);
				res.json(idTask[0])
			})
			.then(trx.commit)
	}).catch((err) => res.status(400).json("unable to add task."));
};

module.exports = {
	handleAddTask,
};
