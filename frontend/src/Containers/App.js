import React from "react";
import "./App.css";
import Tasks from "../Components/Tasks/Tasks";
import MyDay from "../Components/MyDay/MyDay";
import Important from "../Components/Important/Important";
import Planned from "../Components/Planned/Planned";
import MenuBar from "../Components/SharedComponents/MenuBar/MenuBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
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
							exact
							component={Tasks}
						/>

						<Route
							path="/AlphaToDo/MyDay"
							exact
							component={MyDay}
						/>
						<Route
							path="/AlphaToDo/Planned"
							exact
							component={Planned}
						/>

						<Route
							path="/AlphaToDo/Important"
							exact
							component={Important}
						/>


						{/* Primer Render de la app */}
						<Route
							path="/"
							render={() => (
								<div>
									<div className="App-header">
										<h1>
											Pagina no
											<p className="red">Disponible</p>
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
