import React from "react";
import ToDoForm from "./ToDoForm";
import Task from "./Task";
import "../Styles/Task.css";
import "../Styles/ToDoList.css";
import "../Styles/ToDoListHeader.css";

export default class ToDoList extends React.Component {
	state = {
		toDos: [],
		showCompletedTasks: false,
	};

	addToDo = (toDo) => {
		this.setState((state) => ({
			toDos: [toDo, ...state.toDos],
		}));
	};

	toggleComplete = (id) => {
		this.setState((state) => ({
			toDos: state.toDos.map((toDo) => {
				if (toDo.id === id) {
					// suppose to update
					return {
						...toDo,
						completed: !toDo.completed,
					};
				} else {
					return toDo;
				}
			}),
		}));
	};

	toggleImportant = (id) => {
		this.setState((state) => ({
			toDos: state.toDos.map((toDo) => {
				if (toDo.id === id) {
					// suppose to update
					return {
						...toDo,
						important: !toDo.important,
					};
				} else {
					return toDo;
				}
			}),
		}));
	};

	toggleShowCompletedTasks = () => {
		this.setState({
			showCompletedTasks: !this.state.showCompletedTasks,
		});
	};

	handleDeleteToDo = (id) => {
		this.setState((state) => ({
			toDos: state.toDos.filter((toDo) => toDo.id !== id),
		}));
	};

	render() {
		let remainingTasks = this.state.toDos.filter(
			(toDo) =>
				!toDo.completed &&
				((toDo.important === this.props.isImportant &&
					toDo.important) ||
					(toDo.myDay === this.props.isMyDay && toDo.myDay) ||
					(toDo.planned === this.props.isPlanned && toDo.planned) ||
					this.props.showAllTasks)
		);
		let completedTaks = this.state.toDos.filter(
			(toDo) =>
				toDo.completed &&
				((toDo.important === this.props.isImportant &&
					toDo.important) ||
					(toDo.myDay === this.props.isMyDay && toDo.myDay) ||
					(toDo.planned === this.props.isPlanned && toDo.planned) ||
					this.props.showAllTasks)
		);

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
						{remainingTasks.map((toDo) => (
							<Task
								key={toDo.id}
								toggleComplete={() =>
									this.toggleComplete(toDo.id)
								}
								toggleImportant={() =>
									this.toggleImportant(toDo.id)
								}
								onDelete={() => this.handleDeleteToDo(toDo.id)}
								toDo={toDo}
							/>
						))}
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
										key={toDo.id}
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
