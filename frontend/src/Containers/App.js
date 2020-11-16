import React from "react";
import "./App.css";
import Tasks from "../Components/Tasks/Tasks";
import MyDay from "../Components/MyDay/MyDay";
import Important from "../Components/Important/Important";
import Planned from "../Components/Planned/Planned";
import MenuBar from "../Components/SharedComponents/MenuBar/MenuBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {

	state = {
		idUser: 1
	}

	componentDidMount() {
		document.title = "AlphaToDo";
	}

	render() {
		return (
			<div className="App">


				<Router>
					{/* <Route path="/" render={() => <MenuBar />} /> */}

					<Route path="/AlphaToDo" render={() => <MenuBar />} />

					<Switch>
						{/*
						<Route
							exact
							path="/"
							render={() => (
								<Login cambioRuta={this.cambioRuta} />
							)}
						/>

						<Route exact path="/Registro" component={Registro} /> */}

						<Route
							path="/AlphaToDo/Tasks"
							render={(props) => (
								<Tasks
									{...props}
									idUser={this.state.idUser}
								/>
							)}
						/>

						<Route
							path="/AlphaToDo/MyDay"
							render={(props) => (
								<MyDay
									{...props}
									idUser={this.state.idUser}
								/>
							)}
						/>

						<Route
							path="/AlphaToDo/Planned"
							render={(props) => (
								<Planned
									{...props}
									idUser={this.state.idUser}
								/>
							)}
						/>

						<Route
							path="/AlphaToDo/Important"
							render={(props) => (
								<Important
									{...props}
									idUser={this.state.idUser}
								/>
							)}
						/>


						{/* Primer Render de la app */}
						<Route
							path="/"
							render={() => (
								<div>
									<div className="App-header">
										<h1>
											Website
											<p className="red">Not Available</p>
										</h1>
									</div>
								</div>
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
