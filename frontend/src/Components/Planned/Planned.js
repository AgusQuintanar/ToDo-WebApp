import React from "react";
import ToDoList from "../SharedComponents/ToDoList/ToDoList";

export default class Planned extends React.Component {
	render() {
		return (
			<div>
                <ToDoList 
                    isImportant={0}
                    isMyDay={0}
					isPlanned={1}
					idList={1}
					idUser={this.props.idUser}
                />
			</div>
		);
	}
}
