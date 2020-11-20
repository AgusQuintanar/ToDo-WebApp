import React from "react";
import ToDoForm from "./ToDoForm";
import Task from "./Task";
import "../Styles/Task.css";
import "../Styles/ToDoList.css";
import "../Styles/ToDoListHeader.css";

export default class ToDoList extends React.Component {
	state = {
		toDos: [],
		showCompletedTasks: true,
		tempIdTask: -1
	};

	fetchData = () => {
		if (
			!this.props.idUser ||
			!this.props.idList ||
			this.props.idUser.length === 0
		)
			return;
		fetch("http://localhost:3001/getTasks", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idUser: this.props.idUser,
				idList: this.props.idList,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				let parsedResponse = [];
				response.forEach((element) => {
					let tempR = {
						id: parseInt(element.idTask),
						text: element.text,
						completed: parseInt(element.completed),
						important: parseInt(element.important),
						myDay: parseInt(element.myDay),
						planned: parseInt(element.planned),
						datePlanned: element.datePlanned,
						description: element.description,
						idList: parseInt(element.idList),
						idUser: parseInt(element.idUser),
					};
					parsedResponse.push(tempR);
				});

				this.setState({
					toDos: parsedResponse,
				});
			})
			.catch((err) => console.log(err));
	};

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.idUser !== prevProps.idUser) {
			this.fetchData();
		}
	}

	getFormattedDate = (date) => {
		date = new Date(date);
		return (
			date.getFullYear() +
			"-" +
			parseInt(date.getMonth() + 1) +
			"-" +
			date.getDate()
		);
	};

	addToDoRequest = (toDo) => {
		if (!this.props.idUser || !this.props.idList || !toDo) return;
		const newToDo = {
			text: toDo.text,
			completed: toDo.completed,
			important: toDo.important,
			myDay: toDo.myDay,
			planned: toDo.planned,
			datePlanned: toDo.planned
				? this.getFormattedDate(toDo.datePlanned)
				: null,
			description: toDo.description,
			idList: this.props.idList,
			idUser: this.props.idUser,
		};
		fetch("http://localhost:3001/addTask", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newToDo),
		})
		.then((idTask) => idTask.json())
		.then((idTask) => {
			this.setState(
				(state) => ({
					toDos: state.toDos.map((toDo) => {
						if (toDo.id === state.tempIdTask) {
							// suppose to update
							return {
								...toDo,
								id: idTask,
							};
						} else {
							return toDo;
						}
					}),
				}));
		})
		.catch((err) => console.log(err));
	};

	toggleAttrTaskRequest = (id, attr) => {
		fetch("http://localhost:3001/getTask", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idTask: id,
			}),
		})
			.then((task) => task.json())
			.then((task) => {
				if (task) {
					fetch("http://localhost:3001/updateTask", {
						method: "put",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							...task,
							[attr]: task[attr] === "0" ? "1" : "0",
						}),
					});
				}
			})

			.catch((err) => console.log(err));
	};

	handleDeleteToDoRequest = (id) => {
		fetch("http://localhost:3001/removeTask", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idTask: id,
			}),
		}).catch((err) => console.log(err));
	};

	addToDo = (toDo) => {
		this.setState(
			(state) => ({
				toDos: [toDo, ...state.toDos],
				tempIdTask: toDo.id
			}),
			this.addToDoRequest(toDo)
		);
	};

	toggleComplete = (id) => {
		this.setState(
			(state) => ({
				toDos: state.toDos.map((toDo) => {
					if (toDo.id === id) {
						// suppose to update
						return {
							...toDo,
							completed: toDo.completed ? 0 : 1,
						};
					} else {
						return toDo;
					}
				}),
			}),
			this.toggleAttrTaskRequest(id, "completed")
		);
	};

	toggleImportant = (id) => {
		this.setState(
			(state) => ({
				toDos: state.toDos.map((toDo) => {
					if (toDo.id === id) {
						// suppose to update
						return {
							...toDo,
							important: toDo.important ? 0 : 1,
						};
					} else {
						return toDo;
					}
				}),
			}),
			this.toggleAttrTaskRequest(id, "important")
		);
	};

	toggleShowCompletedTasks = () => {
		this.setState({
			showCompletedTasks: !this.state.showCompletedTasks,
		});
	};

	handleDeleteToDo = (id) => {
		this.setState(
			(state) => ({
				toDos: state.toDos.filter((toDo) => toDo.id !== id),
			}),
			this.handleDeleteToDoRequest(id)
		);
	};

	render() {

		let remainingTasks = this.state.toDos
			? this.state.toDos.filter(
					(toDo) =>
						toDo.completed === 0 &&
						((toDo.important === this.props.isImportant &&
							toDo.important === 1) ||
							(toDo.myDay === this.props.isMyDay &&
								toDo.myDay === 1) ||
							(toDo.planned === this.props.isPlanned &&
								toDo.planned === 1) ||
							this.props.showAllTasks === 1)
			  )
			: null;

		let completedTaks = this.state.toDos
			? this.state.toDos.filter(
					(toDo) =>
						toDo.completed === 1 &&
						((toDo.important === this.props.isImportant &&
							toDo.important) ||
							(toDo.myDay === this.props.isMyDay && toDo.myDay) ||
							(toDo.planned === this.props.isPlanned &&
								toDo.planned) ||
							this.props.showAllTasks)
			  )
			: null;

		return (
			<div className="ToDoList">
				<div className="ToDoForm">
					<ToDoForm
						onSubmit={this.addToDo}
						isImportant={this.props.isImportant}
						isMyDay={this.props.isMyDay}
						isPlanned={this.props.isPlanned}
					/>
				</div>

				<div className="toDoListHeader">
					<div className="listName">
						<span> {this.props.name} </span>
					</div>
					<div>
						<button onClick={() => this.toggleShowCompletedTasks()}>
							{this.state.showCompletedTasks ? "Hide" : "Show"}{" "}
							Completed Tasks
						</button>
					</div>
				</div>

				<div className="tasks-wrapper">
					<div>
						<span className="spanRemaining">
							{" "}
							Remaining Tasks ({remainingTasks.length}){" "}
						</span>
						{remainingTasks.map((toDo) => {
							if (toDo) {
								return (
									<Task
										key={"taskU" + toDo.id}
										toggleComplete={() =>
											this.toggleComplete(toDo.id)
										}
										toggleImportant={() =>
											this.toggleImportant(toDo.id)
										}
										onDelete={() =>
											this.handleDeleteToDo(toDo.id)
										}
										toDo={toDo}
									/>
								);
							}
							return null;
						})}
					</div>

					<div>
						{this.state.showCompletedTasks ? (
							<div>
								<span className="spanRemaining">
									{"Completed Tasks ("}
									{completedTaks.length}
									{")"}
								</span>
								{completedTaks.map((toDo) => (
									<Task
										key={"taskC" + toDo.id}
										toggleComplete={() =>
											this.toggleComplete(toDo.id)
										}
										toggleImportant={() =>
											this.toggleImportant(toDo.id)
										}
										onDelete={() =>
											this.handleDeleteToDo(toDo.id)
										}
										toDo={toDo}
									/>
								))}
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}
