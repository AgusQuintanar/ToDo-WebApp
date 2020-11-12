import React from "react";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDoItem";

export default class ToDoList extends React.Component {
	state = {
        todos: [],
        showCompletedTasks: false
	};

	addToDo = (todo) => {
		this.setState((state) => ({
			todos: [todo, ...state.todos],
		}));
	};

	toggleComplete = (id) => {
		this.setState((state) => ({
			todos: state.todos.map((todo) => {
				if (todo.id === id) {
					// suppose to update
					return {
						...todo,
						complete: !todo.complete,
					};
				} else {
					return todo;
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
			todos: state.todos.filter((todo) => todo.id !== id),
		}));
	};


	render() {
        let remainingTasks = this.state.todos.filter((todo) => !todo.complete);
        let completedTaks = this.state.todos.filter((todo) => todo.complete);

		
	

		return (
			<div>
                <ToDoForm onSubmit={this.addToDo} />
                
                <div>
                    <label> Remaining Tasks ({remainingTasks.length}) </label>
                    {remainingTasks.map((todo) => (
					<ToDo
						key={todo.id}
						toggleComplete={() => this.toggleComplete(todo.id)}
						onDelete={() => this.handleDeleteToDo(todo.id)}
						todo={todo}
					/>
                ))}
                </div>

                {this.state.showCompletedTasks ? <div>
                    <label> Completed Tasks ({completedTaks.length}) </label>
                    {completedTaks.map((todo) => (
					<ToDo
						key={todo.id}
						toggleComplete={() => this.toggleComplete(todo.id)}
						onDelete={() => this.handleDeleteToDo(todo.id)}
						todo={todo}
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
