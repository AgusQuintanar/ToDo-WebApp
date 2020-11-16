const handleRemoveTask = (req, res, db) => {
	const { idTask } = req.body;
	if (!idTask) return res.status(400).json("Task ID requiered.");
	
	db("TASK")
		.where("idTask", "=", idTask)
        .del()
		.then(res.json(idTask))
		.catch((err) => res.status(400).json("Task not found."));
};

module.exports = {
	handleRemoveTask,
};
