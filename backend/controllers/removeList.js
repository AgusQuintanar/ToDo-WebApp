const handleRemoveList = (req, res, db) => {
	const { idList } = req.body;
	if (!idList) return res.status(400).json("List ID requiered.");

	db("LIST")
		.where("idList", "=", idList)
		.del()
		.then(res.json(idList))
		.catch((err) => res.status(400).json("List not found."));
};

module.exports = {
	handleRemoveList,
};
