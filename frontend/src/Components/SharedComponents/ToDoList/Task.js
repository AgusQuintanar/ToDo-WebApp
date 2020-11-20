import React from "react";
import "../Styles/Checkbox.css";
import "../Styles/Task.css";
import ModalTask from "./ModalTask";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Task extends React.Component {
	state = {
		showModal: false,
	};

	setShowModal(bool) {
		this.setState({ showModal: bool });
	}

	render() {
		return (
			<div className="Task">
				<ModalTask
					show={this.state.showModal}
					onHide={() => this.setShowModal(false)}
					toDo={this.props.toDo}
					modifyToDo={this.props.modifyToDo}
				/>
				<div
					className="TaskWrapper noselect"
					onDoubleClick={() => this.setShowModal(true)}
					style={{
						textDecoration: this.props.toDo.completed
							? "line-through"
							: "",
						cursor: "pointer",
					}}
				>
					<div className="TaskText">
						<span>{this.props.toDo.text}</span>
					</div>

					{this.props.toDo.planned ? (
						<div className="TaskDate">
							<span>
								{" "}
								{new Date(
									this.props.toDo.datePlanned
								).toDateString()}{" "}
							</span>
						</div>
					) : null}
				</div>

				<div className="TaskDelete">
					<button
						onClick={this.props.onDelete}
						id={"delB" + this.props.toDo.id}
					>
						<i
							className="fa fa-times-circle"
							aria-hidden="true"
						></i>
					</button>
				</div>

				<div className="TaskCompletedCB">
					<input
						id={"ccb" + this.props.toDo.id}
						className="inp-cbx"
						type="checkbox"
						style={{ display: "none" }}
						checked={this.props.toDo.completed}
						onChange={this.props.toggleComplete}
					/>
					<label className="cbx" htmlFor={"ccb" + this.props.toDo.id}>
						<span>
							<svg width="12px" height="9px" viewBox="0 0 12 9">
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
						htmlFor={"star" + this.props.toDo.id}
						className="star-checkbox"
					></label>
				</div>
			</div>
		);
	}
}
