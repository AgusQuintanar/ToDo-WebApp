import React from "react";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDoItem";

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
				(toDo.important === this.props.isImportant ||
					toDo.myDay === this.props.isMyDay ||
					toDo.planned === this.props.isPlanned ||
					this.props.showAllTasks)
		);
		let completedTaks = this.state.toDos.filter(
			(toDo) =>
				toDo.completed &&
				(toDo.important === this.props.isImportant ||
					toDo.myDay === this.props.isMyDay ||
					toDo.planned === this.props.isPlanned ||
					this.props.showAllTasks)
		);

		return (
			<div>
				<ToDoForm
					onSubmit={this.addToDo}
					isImportant={this.props.isImportant}
					isMyDay={this.props.isMyDay}
					isPlanned={this.props.isPlanned}
				/>

				<div>
					<label> Remaining Tasks ({remainingTasks.length}) </label>
					{remainingTasks.map((toDo) => (
						<ToDo
							key={toDo.id}
							toggleComplete={() => this.toggleComplete(toDo.id)}
							toggleImportant={() =>
								this.toggleImportant(toDo.id)
							}
							onDelete={() => this.handleDeleteToDo(toDo.id)}
							toDo={toDo}
						/>
					))}
				</div>

				{this.state.showCompletedTasks ? (
					<div>
						<label>
							{"Completed Tasks ("}
							{completedTaks.length}
							{")"}
						</label>
						{completedTaks.map((toDo) => (
							<ToDo
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
				) : null}

				<div>
					<button onClick={() => this.toggleShowCompletedTasks()}>
						{this.state.showCompletedTasks ? "Hide" : "Show"}{" "}
						Completed Tasks
					</button>
				</div>
			</div>
		);
	}
}
