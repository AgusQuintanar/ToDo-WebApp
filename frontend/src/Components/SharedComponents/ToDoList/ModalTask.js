import { Modal, Button } from "react-bootstrap";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Input } from "reactstrap";
import { Alert } from "@material-ui/lab";

export default class Task extends React.Component {
	state = {
		text: "",
		datePlanned: null,
		description: "",
		showAlert: false,
    };
    
    componentDidMount = () => {
        this.resetState();
    }

	resetState = () => {
		this.setState({
			text: this.props.toDo.text ? this.props.toDo.text : "",
			datePlanned: this.props.toDo.datePlanned
				? new Date(this.props.toDo.datePlanned)
				: null,
			description: this.props.toDo.description
				? this.props.toDo.description
				: "",
			showAlert: false,
		});
    };
    
    closeModal = () => {
        this.props.onHide();
        this.resetState();
    }

	toggleShowAlert = () => {
		this.setState({
			showAlert: !this.state.showAlert,
		});
	};

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]:
				event.target.name === "datePlanned"
					? new Date(event.target.value)
					: event.target.value,
		});
	};

	handleSaveChanges = () => {
		if (this.state.text.trim().length === 0) {
			this.toggleShowAlert();
		} else {
			this.props.onHide();
			const newToDo = {
				...this.props.toDo,
				text: this.state.text.trim(),
				datePlanned: this.state.datePlanned ? this.state.datePlanned.setDate(this.state.datePlanned.getDate() + 1) : null,
				description: this.state.description.trim(),
			};
			this.props.modifyToDo(newToDo);
		}
	};

	render() {
		return (
			<Modal
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				show={this.props.show}
			>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						Task Editor
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						{this.state.showAlert ? (
							<Alert
								className="alertLogin"
								severity="error"
								onClose={this.toggleShowAlert}
								style={{ width: "100%", marginBottom: "5vh" }}
							>
								<strong>Error!</strong> Title can not be empty.
							</Alert>
						) : null}
					</div>
					<label htmlFor={"textInp" + this.props.toDo.id}>
						Title:
					</label>
					<Input
						type="text"
						required
						className="form-control"
						placeholder=""
						name="text"
						value={this.state.text}
						id={"textInp" + this.props.toDo.id}
						onChange={this.handleInputChange}
						style={{ marginBottom: "4vh" }}
					/>
					<label htmlFor={"descriptionInp" + this.props.toDo.id}>
						Description:
					</label>

					<Input
						type="textarea"
						className="form-control"
						placeholder=""
						name="description"
						value={this.state.description}
						id={"descriptionInp" + this.props.toDo.id}
						onChange={this.handleInputChange}
						style={{ marginBottom: "4vh" }}
					/>
					{this.props.toDo.planned === 1 ? (
						<div>
							<label htmlFor={"dateInp" + this.props.toDo.id}>
								Due Date:
							</label>
							<Input
								type="date"
								className="form-control"
								placeholder="Due Date"
								name="datePlanned"
								onKeyDown={(e) => e.preventDefault()}
								value={
									this.state.datePlanned
										? this.state.datePlanned
												.toISOString()
												.substr(0, 10)
										: null
								}
								id={"dateInp" + this.props.toDo.id}
								onChange={this.handleInputChange}
							/>
						</div>
					) : null}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.closeModal}>Close</Button>
					<Button onClick={this.handleSaveChanges}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
