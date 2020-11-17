import React from "react";
import ToDoList from "../SharedComponents/ToDoList/ToDoList";

export default class MyDay extends React.Component {
	render() {
		return (
			<div>
                <ToDoList 
                    isImportant={0}
                    isMyDay={1}
					isPlanned={0}
					idList={1}
					idUser={this.props.idUser}
                />
			</div>
		);
	}
}
