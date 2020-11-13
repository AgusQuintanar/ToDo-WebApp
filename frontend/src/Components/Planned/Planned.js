import React from "react";
import ToDoList from "../SharedComponents/ToDoList/ToDoList";

export default class Planned extends React.Component {
	render() {
		return (
			<div>
                <ToDoList 
                    isImportant={false}
                    isMyDay={false}
                    isPlanned={true}
                />
			</div>
		);
	}
}
