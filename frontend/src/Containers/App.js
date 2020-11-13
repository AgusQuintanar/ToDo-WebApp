import "./App.css";
import Tasks from "../Components/Tasks/Tasks";
import MyDay from "../Components/MyDay/MyDay";
import Important from "../Components/Important/Important";
import Planned from "../Components/Planned/Planned";

function App() {
	return (
		<div className="App">
			{/*
			<ToDoList />
			
		*/}
			MyDay
			<MyDay />
			<br></br>
			<br></br>

			Tasks
			<Tasks />
			<br></br>
			<br></br>

			Planned
			<Planned />
			<br></br>
			<br></br>

			Important
			<Important />
		</div>
	);
}

export default App;
