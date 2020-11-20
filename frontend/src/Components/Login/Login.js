import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Button,
	Label,
	Form,
	FormGroup,
	Input,
	FormFeedback,
} from "reactstrap";
import { Alert } from "@material-ui/lab";
import "./Styles/Login.css";

import auth from "./Auth";

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			registro: false,
			inicioSes: false,
			recuperar: false,
			correoIS: "",
			contraseñaIS: "",
			nombre: "",
			apellido: "",
			correo: "",
			contraseña: "",
			fecha: "",
			correoPerdido: "",
			touched: {
				correoIS: false,
				contraseñaIS: false,
				nombre: false,
				apellido: false,
				correo: false,
				contraseña: false,
				fecha: false,
				correoPerdido: false,
			},
			showSuccessAlert: false,
			showFailAlert: false,
		};
		this.handleSubmitIS = this.handleSubmitIS.bind(this);
		this.handleSubmitR = this.handleSubmitR.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}
	handleInputChange = (event) => {
		console.log(event.target.value);
		this.setState({ [event.target.name]: event.target.value });
	};
	handleSubmitIS = (event, errors) => {
		console.log(errors);
		const user = {
			email: this.state.correoIS.trim(),
			password: this.state.contraseñaIS.trim(),
		};

		if (
			errors.correoIS !== "" ||
			errors.contraseñaIS !== "" ||
			(this.state.correoIS.length === 0 &&
				this.state.contraseñaIS.length === 0)
		) {
			event.preventDefault();
			this.toggleShowAlert("showSuccessAlert");
			console.log("Se manejó con exito, no se envió");
		} else {
			console.log("Current State is: " + JSON.stringify(user));
			this.handleLogin(user);
		}
	};
	handleSubmitRec = (event, errors) => {
		console.log(errors);

		const isData = {
			correoPerdido: this.state.correoPerdido,
		};
		if (
			errors.correoPerdido !== "" ||
			this.state.correoPerdido.length === 0
		) {
			event.preventDefault();

			console.log("Se manejó con exito, no se envió");
		} else {
			console.log("Current State is: " + JSON.stringify(isData));
		}
	};
	handleLogin = (user) => {
		fetch("http://localhost:3001/login", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		})
			.then((userId) => userId.json())
			.then((userId) => {
				userId = parseInt(userId);
				if (userId > 0) {
					console.log("Usuario valido");
					auth.login(() => {
						this.props.history.push("/AlphaToDo/MyDay");
						this.props.routeChange(userId);
					});
				} else {
					this.toggleShowAlert("showSuccessAlert");
				}
			})

			.catch((err) => console.log(err));
	};

	handleRegister = (newUser) => {
		fetch("http://localhost:3001/registerUser", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newUser),
		})
			.then((userId) => userId.json())
			.then((userId) => {
				userId = parseInt(userId);
				if (userId > 0) {
					console.log("Usuario valido");
					auth.login(() => {
						this.props.history.push("/AlphaToDo/MyDay");
						this.props.routeChange(userId);
					});
				} else {
					this.toggleShowAlert("showSuccessAlert");
				}
			})

			.catch((err) => console.log(err));
	};

	handleSubmitR = (event, errors) => {
		console.log(errors);

		const newUser = {
			firstName: this.state.nombre.trim(),
			lastName: this.state.apellido.trim(),
			email: this.state.correo.trim(),
			password: this.state.contraseña.trim(),
			birthday: this.state.fecha,
		};
		if (
			errors.nombre !== "" ||
			errors.apellido !== "" ||
			errors.correo !== "" ||
			errors.contraseña !== "" ||
			errors.fecha !== "" ||
			(this.state.nombre.length === 0 &&
				this.state.apellido.length === 0 &&
				this.state.correo.length === 0 &&
				this.state.fecha.length === 0 &&
				this.state.contraseña.length === 0)
		) {
			event.preventDefault();
			console.log("Se manejó con exito, no se envió");
			this.toggleShowAlert("showSuccessAlert");
		} else {
			console.log("Current State is: " + JSON.stringify(newUser));
			this.handleRegister(newUser);
		}
	};
	handleBlur = (field) => (event) => {
		this.setState({
			touched: { ...this.state.touched, [field]: true },
		});
	};
	validate(
		correoIS,
		contraseñaIS,
		nombre,
		apellido,
		contraseña,
		correo,
		fecha,
		correoPerdido
	) {
		const errors = {
			correoIS: "",
			contraseñaIS: "",
			nombre: "",
			apellido: "",
			correo: "",
			contraseña: "",
			fecha: "",
			correoPerdido: "",
		};
		/*Validación inicio de sesión */

		/*Validación inicio sesión */
		if (this.state.touched.correoIS && correoIS.trim().length === 0) {
			errors.correoIS = "Rellene el espacio.";
		} else if (
			this.state.touched.correoIS &&
			!this.validateEmail(correoIS.trim())
		) {
			errors.correoIS = "Correo electronico no valido.";
		} 

		if (this.state.touched.contraseñaIS && contraseñaIS.trim().length < 8) {
			errors.contraseñaIS = "Se requiere un mínimo de 8 caracteres.";
		} 
		
		/*Validación registro */
		if (this.state.touched.nombre && nombre.trim().length === 0) {
			errors.nombre = "Rellene el espacio.";
		} else if (this.state.touched.nombre && nombre.trim().length > 20) {
			errors.nombre = "Ha sobrepasado el limite de caracteres (20).";
		} 
		

		if (this.state.touched.apellido && apellido.trim().length === 0) {
			errors.apellido = "Rellene el espacio.";
		} else if (this.state.touched.apellido && apellido.length > 20) {
			errors.apellido = "Ha sobrepasado el limite de caracteres (20)";
		} 

		if (this.state.touched.correo && correo.trim().length === 0) {
			errors.correo = "Rellene el espacio.";
		} else if (this.state.touched.correo && !this.validateEmail(correo.trim())) {
			errors.correo = "Formato incorrecto de correo.";
		} 

		if (this.state.touched.contraseña && contraseña.trim().length === 0) {
			errors.contraseña = "Rellene el espacio.";
		} else if (this.state.touched.contraseña && contraseña.length < 8) {
			errors.contraseña = "Se requiere un mínimo de 8 caracteres.";
		} 

		if (this.state.touched.fecha && !fecha) {
			errors.fecha = "Se requiere su Fecha de Nacimiento.";
		}
		if (this.state.touched.correoPerdido && correoPerdido.length === 0) {
			errors.correoPerdido = "Rellene el espacio.";
		} else if (
			this.state.touched.correoPerdido &&
			!this.validateEmail(correoPerdido)
		) {
			errors.correoPerdido = "Formato incorrecto de correo.";
		} else if (this.state.touched.correo && !(correo.trim().length > 0)) {
			errors.correo = "Formato incorrecto de correo.";
		}

		return errors;
	}

	toggleShowAlert = (alertName) => {
		this.setState({
			[alertName]: !this.state[alertName],
		});
	};

	validateEmail = (mail) => {
		console.log(mail);
		var mailFormat = new RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
		);

		console.log(mailFormat.test(mail));
		return mailFormat.test(mail);
	};

	render() {
		const errors = this.validate(
			this.state.correoIS,
			this.state.contraseñaIS,
			this.state.nombre,
			this.state.apellido,
			this.state.contraseña,
			this.state.correo,
			this.state.fecha,
			this.state.correoPerdido
		);

		return (
			<div className="login">
				{this.state.showSuccessAlert ? (
					<Alert
						className="alertLogin"
						severity="error"
						onClose={() => this.toggleShowAlert("showSuccessAlert")}
					>
						<strong>Error!</strong> Favor de verificar que los datos
						ingresados sean correctos.
					</Alert>
				) : null}
				<div className="loginHeader">
					<h1 style={{ color: "white" }}>
						Bienvenido a Águila A-Tareada!!
					</h1>{" "}
				</div>
				<div className="loginForms">
					<div className="row">
						<div className="col-6">
							<div className="row">
								<div className="col-12">
									<div className="jumbotron mt-3">
										<h2>Iniciar Sesión</h2>
										<Form>
											<FormGroup className="row">
												<div className="col-12">
													<Label htmlFor="email">
														Correo Electrónico
													</Label>
													<Input
														type="email"
														required
														className="form-control"
														placeholder="Correo Electrónico"
														name="correoIS"
														value={
															this.state.correoIS
														}
														valid={
															errors.correoIS ===
															""
														}
														invalid={
															errors.correoIS !==
															""
														}
														id="correoIS"
														onChange={
															this
																.handleInputChange
														}
														onBlur={this.handleBlur(
															"correoIS"
														)}
													/>
													<FormFeedback>
														{errors.correoIS}
													</FormFeedback>
												</div>
											</FormGroup>

											<FormGroup className="row">
												<div className="col-12">
													<Label htmlFor="pass">
														Contraseña
													</Label>
													<Input
														type="password"
														required
														className="form-control"
														placeholder="Contraseña"
														name="contraseñaIS"
														value={
															this.state
																.contraseñaIS
														}
														valid={
															errors.contraseñaIS ===
															""
														}
														invalid={
															errors.contraseñaIS !==
															""
														}
														id="contraseñaIS"
														onChange={
															this
																.handleInputChange
														}
														onBlur={this.handleBlur(
															"contraseñaIS"
														)}
													/>
													<FormFeedback>
														{errors.contraseñaIS}
													</FormFeedback>

													<small className="form-text text-muted">
														Mínimo 8 caracteres
													</small>
												</div>
											</FormGroup>

											<FormGroup className="row">
												<div className="col-12 text-center">
													<div className="row justify-content-center">
														<div className="col-12">
															<Button
																onClick={(
																	event
																) =>
																	this.handleSubmitIS(
																		event,
																		errors
																	)
																}
																className="btn-lg btn-info btn-block"
															>
																Ingresar
															</Button>
														</div>
													</div>
												</div>
											</FormGroup>
										</Form>
									</div>
								</div>
							</div>
						</div>
						<div className="col-6">
							<div className="jumbotron mt-3">
								<h1>Registrate</h1>
								<Form>
									<h5 className="text-muted">
										Crea una cuenta. Es gratis y solo toma
										un minuto
									</h5>
									<FormGroup className="row">
										<div className="col-md-6 col-sm-12 mb-3">
											<label htmlFor="nombre">
												Nombre
											</label>
											<Input
												type="text"
												required
												className="form-control"
												placeholder="Nombre"
												name="nombre"
												id="nombre"
												valid={errors.nombre === ""}
												invalid={errors.nombre !== ""}
												value={this.state.nombre}
												onChange={
													this.handleInputChange
												}
												onBlur={this.handleBlur(
													"nombre"
												)}
											/>
											<FormFeedback>
												{errors.nombre}
											</FormFeedback>
										</div>
										<div className="col-md-6 col-sm-12 mb-3">
											<label htmlFor="apellido">
												Apellido
											</label>
											<Input
												type="apellido"
												required
												className="form-control"
												placeholder="Apellido"
												name="apellido"
												id="apellido"
												valid={errors.apellido === ""}
												invalid={errors.apellido !== ""}
												value={this.state.apellido}
												onChange={
													this.handleInputChange
												}
												onBlur={this.handleBlur(
													"apellido"
												)}
											/>
											<FormFeedback>
												{errors.apellido}
											</FormFeedback>
										</div>
									</FormGroup>
									<div className="form-group row">
										<div className="col-12">
											<Label htmlFor="email">
												Correo Electrónico
											</Label>
											<Input
												type="email"
												required
												className="form-control"
												placeholder="Correo Electrónico"
												name="correo"
												id="correo"
												valid={errors.correo === ""}
												invalid={errors.correo !== ""}
												value={this.state.correo}
												onChange={
													this.handleInputChange
												}
												onBlur={this.handleBlur(
													"correo"
												)}
											/>
											<FormFeedback>
												{errors.correo}
											</FormFeedback>
										</div>
									</div>

									<div className="form-group row ">
										<div className="col-12">
											<Label htmlFor="pass">
												Contraseña
											</Label>
											<Input
												type="password"
												required
												className="form-control"
												placeholder="Contraseña"
												name="contraseña"
												id="contraseña"
												valid={errors.contraseña === ""}
												invalid={
													errors.contraseña !== ""
												}
												value={this.state.contraseña}
												onChange={
													this.handleInputChange
												}
												onBlur={this.handleBlur(
													"contraseña"
												)}
											/>
											<FormFeedback>
												{errors.contraseña}
											</FormFeedback>

											<small className="form-text text-muted">
												Mínimo 8 caracteres
											</small>
										</div>
									</div>

									<div className="form-group row justify-content-center">
										<div className="col-lg-6 col-md-10 col-sm-12 mb-3">
											<label htmlFor="start-date">
												Birthday:
											</label>
											<Input
												type="date"
												required
												name="fecha"
												id="start-date"
												valid={errors.fecha === ""}
												invalid={errors.fecha !== ""}
												value={this.state.fecha}
												onChange={
													this.handleInputChange
												}
												onBlur={this.handleBlur(
													"fecha"
												)}
											/>
											<FormFeedback>
												{errors.fecha}
											</FormFeedback>
										</div>
									</div>

									<div className="form-group row">
										<div className="col-12 text-center">
											<div className="row justify-content-center">
												<div className="col-4 col-sm-9 col-md-8">
													<Button
														onClick={(event) =>
															this.handleSubmitR(
																event,
																errors
															)
														}
														className="btn-lg btn-info btn-block"
													>
														Regístrarse
													</Button>
												</div>
											</div>
										</div>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
