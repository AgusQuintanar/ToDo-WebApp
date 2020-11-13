import React from "react";
import shortid from "shortid";

export default class ToDoForm extends React.Component {
	state = {
		text: "",
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit({
			id: shortid.generate(),
			text: this.state.text,
			completed: false,
			important: this.props.isImportant,
			myDay: this.props.isMyDay,
			planned: this.props.isPlanned,
			datePlanned: this.props.isPlanned ? Date() : null,
			repetition: []
		});
		this.setState({
			text: "",
		});
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					name="text"
					value={this.state.text}
					onChange={this.handleChange}
					placeholder="Add a Task"
				/>
			</form>
		);
	}
}
