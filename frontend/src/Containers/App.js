import React from "react";
import "./App.css";
import Tasks from "../Components/Tasks/Tasks";
import MyDay from "../Components/MyDay/MyDay";
import Important from "../Components/Important/Important";
import Planned from "../Components/Planned/Planned";
import MenuBar from "../Components/SharedComponents/MenuBar/MenuBar";
import Login from "../Components/Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import auth from "../Components/Login/Auth";
import ToDoList from "../Components/SharedComponents/ToDoList/ToDoList";

const initialState = {
	signIn: auth.isAuthenticated(),
	idUser: 1,
	customLists: [],
};
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	routeChange = (idUser) => {
		this.setState({
			idUser: idUser,
			signIn: auth.isAuthenticated(),
		});
	};

	componentDidMount() {
		document.title = "Alpha To Do";
		this.getCustomLists()
	}

	getCustomLists = () => {
		if (
			!this.state.idUser 
		)
			return;
		fetch("http://localhost:3001/getLists", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idUser: this.state.idUser,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				
				console.log(response);
				this.setState({
					customLists: response,
				});
			})
			.catch((err) => console.log(err));
	}

	addCustomListRequest = () => {
		if (!this.state.idUser) return;
		const newCustomList = {
			name: "Untitled List",
			idUser: this.state.idUser,
		};
		fetch("http://localhost:3001/addList", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newCustomList),
		})
		.then((idList) => {
			return idList
		})
		.catch((err) => console.log(err));
	};

	addCustomList = () => {
		const customList = {
			idList: this.addCustomListRequest(),
			name: "Untitled List",
		};
		this.setState(
			(state) => ({
				customLists: [customList, ...state.customLists],
			}),
		);
	};

	render() {
		return (
			<div className="App">
				<Router>
					{/* <Route path="/" render={() => <MenuBar />} /> */}

					<Route
						path="/AlphaToDo"
						render={() => (
							<MenuBar
								addCustomList={this.addCustomList}
								customLists={this.state.customLists}
							/>
						)}
					/>

					<Switch>
						<Route
							exact
							path="/"
							render={(routeProps) => (
								<Login
									routeChange={this.routeChange}
									{...routeProps}
								/>
							)}
						/>

						<Route
							path="/AlphaToDo/Tasks"
							render={(props) => (
								<Tasks {...props} idUser={this.state.idUser} />
							)}
						/>

						<Route
							path="/AlphaToDo/MyDay"
							render={(props) => (
								<MyDay {...props} idUser={this.state.idUser} />
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

						{this.state.customLists.map((cusList) => {
							if (cusList && cusList.idList && cusList.idList !== 1) {
								return (
									<Route
										path={"/AlphaToDo/"+cusList.idList.toString()}
										key={"cl-"+cusList.idList}
										render={(props) => (
											<ToDoList
												{...props}
												isImportant={0}
												isMyDay={0}
												isPlanned={0}
												showAllTasks={1}
												idList={cusList.idList}
												idUser={this.state.idUser}
											/>
										)}
									/>
								);
							}
							return null;
						})}

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
