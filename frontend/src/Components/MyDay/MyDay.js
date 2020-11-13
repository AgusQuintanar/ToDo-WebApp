import React from "react";
import ToDoList from "../SharedComponents/ToDoList/ToDoList";

export default class MyDay extends React.Component {
	render() {
		return (
			<div>
                <ToDoList 
                    isImportant={false}
                    isMyDay={true}
                    isPlanned={false}
                />
			</div>
		);
	}
}
