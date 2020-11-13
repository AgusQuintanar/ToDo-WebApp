import React from "react";
import "../Styles/Checkbox.css";

export default class ToDoItem extends React.Component {

	render() {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div
					style={{
						textDecoration: this.props.toDo.completed
							? "line-through"
							: "",
					}}
				>
					{this.props.toDo.text}
				</div>
				{this.props.toDo.planned ? <div> {new Date(this.props.toDo.datePlanned).toDateString()} </div> : null}

				<button onClick={this.props.onDelete}>x</button>
				<div className="">
					<input
						autoComplete="off"
						type="checkbox"
						name="completedTaskCB"
						id="completedTaskCB"
						checked={this.props.toDo.completed}
						onChange={this.props.toggleComplete}
					/>
				</div>

                <div className="">
					<input
						autoComplete="off"
						type="checkbox"
						name="importantTaskCB"
						id="importantTaskCB"
						checked={this.props.toDo.important}
						onChange={this.props.toggleImportant}
					/>
				</div>
                
			</div>
		);
	}
}
