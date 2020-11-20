import React from "react";
import "../Styles/MenuBar.css";
import { Link } from "react-router-dom";

export default class MenuItem extends React.Component {
	render() {
		return (
			<li className="sidebar-dropdown" onClick={() => console.log("click")} onDoubleClick={() => console.log("double click")}>
				<Link to={this.props.link}>
					<i className={"fa " + this.props.icon}></i>
					<span className="itemText">{this.props.text}</span>
					<span className="badge badge-pill badge-primary">
						{" "}
						{this.props.count}{" "}
					</span>
				</Link>
			</li>
		);
	}
}
