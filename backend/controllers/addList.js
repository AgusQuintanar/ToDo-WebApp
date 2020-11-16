const handleAddList = (req, res, db) => {
	const { name, idUser } = req.body;
	db.transaction((trx) => {
		trx.insert({
            name: name,
            idUser: idUser
		})
			.into("LIST")
			.then((response) => {
				res.json(response);
			})
			.then(trx.commit);
	}).catch((err) => res.status(400).json("unable to add list."));
};

module.exports = {
	handleAddList,
};
