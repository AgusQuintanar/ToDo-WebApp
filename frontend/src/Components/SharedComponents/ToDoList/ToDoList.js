import React from "react";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDoItem";

export default class ToDoList extends React.Component {
	state = {
        toDos: [],
        showCompletedTasks: false
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
						complete: !toDo.complete,
					};
				} else {
					return toDo;
				}
			}),
		}));
    };

    toggleFavorite = (id) => {
		this.setState((state) => ({
			toDos: state.toDos.map((toDo) => {
				if (toDo.id === id) {
					// suppose to update
					return {
						...toDo,
						favorite: !toDo.favorite,
					};
				} else {
					return toDo;
				}
			}),
		}));
    };
    
    toggleShowCompletedTasks = () => {
        this.setState({
                showCompletedTasks: !this.state.showCompletedTasks
        });
    }

	handleDeleteToDo = (id) => {
		this.setState((state) => ({
			toDos: state.toDos.filter((toDo) => toDo.id !== id),
		}));
	};


	render() {
        let remainingTasks = this.state.toDos.filter((toDo) => !toDo.complete);
        let completedTaks = this.state.toDos.filter((toDo) => toDo.complete);

		
		return (
			<div>
                <ToDoForm onSubmit={this.addToDo} />
                
                <div>
                    <label> Remaining Tasks ({remainingTasks.length}) </label>
                    {remainingTasks.map((toDo) => (
					<ToDo
						key={toDo.id}
						toggleComplete={() => this.toggleComplete(toDo.id)}
                        toggleFavorite={() => this.toggleFavorite(toDo.id)}
						onDelete={() => this.handleDeleteToDo(toDo.id)}
						toDo={toDo}
					/>
                ))}
                </div>

                {this.state.showCompletedTasks ? <div>
                    <label> Completed Tasks ({completedTaks.length}) </label>
                    {completedTaks.map((toDo) => (
					<ToDo
						key={toDo.id}
						toggleComplete={() => this.toggleComplete(toDo.id)}
                        toggleFavorite={() => this.toggleFavorite(toDo.id)}
						onDelete={() => this.handleDeleteToDo(toDo.id)}
						toDo={toDo}
					/>
                ))}
                </div> : null}
				

				<div>
					<button onClick={() => this.toggleShowCompletedTasks()}>
						{this.state.showCompletedTasks ? "Hide" : "Show"} Completed Tasks
					</button>

				</div>
				
				
			</div>
		);
	}
}
