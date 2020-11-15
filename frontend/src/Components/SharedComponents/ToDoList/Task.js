import React from "react";
import "../Styles/Checkbox.css";
import "../Styles/Task.css";

export default class Task extends React.Component {
	render() {
		return (
			<div className="Task">
				<div
					className="TaskText"
					style={{
						textDecoration: this.props.toDo.completed
							? "line-through"
							: "",
					}}
				>
					<span>{this.props.toDo.text}</span>
				</div>

				{this.props.toDo.planned ? (
					<div className="TaskDate">
						{" "}
						{new Date(
							this.props.toDo.datePlanned
						).toDateString()}{" "}
					</div>
				) : null}

		

				<div className="TaskDelete">
					<button onClick={this.props.onDelete}>
						<i
							className="fa fa-times-circle"
							aria-hidden="true"
						></i>
					</button>
				</div>

				<div className="TaskCompletedCB">
					<input
						className="inp-cbx"
						id="cbx"
						type="checkbox"
						style={{ display: "none" }}
						checked={this.props.toDo.completed}
						onChange={this.props.toggleComplete}
					/>
					<label className="cbx" for="cbx">
						<span>
							<svg width="12px" height="9px" viewbox="0 0 12 9">
								<polyline points="1 5 4 8 11 1"></polyline>
							</svg>
						</span>
					</label>
				</div>

				<div className="TaskImportantCB">
					<input
						id={"star" + this.props.toDo.id}
						className="hide-checkbox"
						type="checkbox"
						style={{ display: "none" }}
						checked={this.props.toDo.important}
						onChange={this.props.toggleImportant}
					/>

					<label
						for={"star" + this.props.toDo.id}
						className="star-checkbox"
					></label>
				</div>
			</div>
		);
	}
}
