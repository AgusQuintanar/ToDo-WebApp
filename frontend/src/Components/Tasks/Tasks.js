import React from "react";
import ToDoList from "../SharedComponents/ToDoList/ToDoList";

export default class Tasks extends React.Component {
	render() {
		return (
			<div>
                <ToDoList 
                    isImportant={false}
                    isMyDay={false}
                    isPlanned={false}
                    showAllTasks={true}
                />
			</div>
		);
	}
}
