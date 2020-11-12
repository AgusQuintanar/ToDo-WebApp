import React from "react";
import "../Styles/Checkbox.css";

export default class ToDoItem extends React.Component {
	render() {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div
					style={{
						textDecoration: this.props.todo.complete
							? "line-through"
							: "",
					}}
				>
					{this.props.todo.text}
				</div>
				<button onClick={this.props.onDelete}>x</button>
				<div className="">
					<input
						autocomplete="off"
						type="checkbox"
						name="completed"
						value="s"
						id="completed"
						checked={this.props.todo.complete}
						onChange={this.props.toggleComplete}
					/>
				</div>
			</div>
		);
	}
}
