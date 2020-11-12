import React from "react";
import "../Styles/Checkbox.css";

export default class ToDoItem extends React.Component {
	render() {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div
					style={{
						textDecoration: this.props.toDo.complete
							? "line-through"
							: "",
					}}
				>
					{this.props.toDo.text}
				</div>
				<button onClick={this.props.onDelete}>x</button>
				<div className="">
					<input
						autoComplete="off"
						type="checkbox"
						name="completedTaskCB"
						id="completedTaskCB"
						checked={this.props.toDo.complete}
						onChange={this.props.toggleComplete}
					/>
				</div>

                <div className="">
					<input
						autoComplete="off"
						type="checkbox"
						name="favoriteTaskCB"
						id="favoriteTaskCB"
						checked={this.props.toDo.favorite}
						onChange={this.props.toggleFavorite}
					/>
				</div>
                
			</div>
		);
	}
}
