import React from "react";
import ToDoList from "../SharedComponents/ToDoList/ToDoList";

export default class Important extends React.Component {
	render() {
		return (
            <div>
                <ToDoList 
                    isImportant={true}
                    isMyDay={false}
                    isPlanned={false}
                />
			</div>
		);
	}
}
