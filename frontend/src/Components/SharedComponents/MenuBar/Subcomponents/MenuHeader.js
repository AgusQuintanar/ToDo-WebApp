import React from "react";
import "../Styles/MenuBar.css";

export default class MenuHeader extends React.Component {
	render() {
		return (
			<div className="sidebar-header">
				<div className="user-pic">
					<img
						className="img-responsive img-rounded"
						src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
						alt="profile pic"
					/>
				</div>
				<div className="user-info">
					<span className="user-name">
						{this.props.firstName}{" "}
						<strong>{this.props.lastName}</strong>
					</span>
					<span className="user-status">
						<i className="fa fa-circle"></i>
						<span>Online</span>
					</span>
				</div>
			</div>
		);
	}
}
