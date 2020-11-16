const handleUpdateTask = (req, res, db) => {
	const {
		text,
		completed,
		important,
		myDay,
		planned,
		datePlanned,
		description,
		idTask,
	} = req.body;

	db("TASK")
		.where("idTask", "=", idTask)
		.update({
			text: text,
			completed: completed,
			important: important,
			myDay: myDay,
			planned: planned,
			datePlanned: datePlanned,
			description: description,
		})
		.then(res.json(idTask))
		.catch((err) => res.status(400).json("Task not found."));
};

module.exports = {
	handleUpdateTask,
};

