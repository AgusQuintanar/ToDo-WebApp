import React from "react";
import ToDoList from "../SharedComponents/ToDoList/ToDoList";

export default class Important extends React.Component {
	render() {
		return (
            <div>
                <ToDoList 
                    isImportant={1}
                    isMyDay={0}
                    isPlanned={0}
                    idList={1}
                    idUser={this.props.idUser}
                />
			</div>
		);
	}
}
