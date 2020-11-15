import React from "react";
import "./Styles/MenuBar.css";
import MenuHeader from "./Subcomponents/MenuHeader";
import MenuItem from "./Subcomponents/MenuItem";

export default class Tasks extends React.Component {
	render() {
		return (
			<div className="navBar">
				<link
					rel="stylesheet"
					href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
					integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
					crossorigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
					integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
					crossorigin="anonymous"
				/>
			
				<div className="page-wrapper chiller-theme toggled">
					
					<nav id="sidebar" className="sidebar-wrapper">
						<div className="sidebar-content">
							<div className="sidebar-brand">
								<a href="#"> Alpha To Do </a>
                            </div>
                            
                            <MenuHeader 
                                firstName={"Agus"}
                                lastName={"Quintanar"}
                            />

							<div className="sidebar-menu">
								<ul>
									<li className="header-menu">
										<span>General</span>
									</li>

									<MenuItem
										text={"My Day"}
										count={123}
                                        link={"/AlphaToDo/MyDay"}
                                        icon="fa-sun"
									/>

									<MenuItem
										text={"Important"}
										count={1}
                                        link={"/AlphaToDo/Important"}
                                        icon="fa-star"
									/>

									<MenuItem
										text={"Planned"}
										count={1233}
                                        link={"/AlphaToDo/Planned"}
                                        icon="fa-calendar"
									/>

									<MenuItem
										text={"Tasks"}
										count={12}
                                        link={"/AlphaToDo/Tasks"}
                                        icon="fa-sticky-note"
									/>

									<li className="header-menu">
										<span> Custom Lists </span>
									</li>
								</ul>
							</div>
						</div>
						<div className="sidebar-footer">
							<div className="newList">
								<i className="fa fa-plus"></i>
                                <span className="itemText">New List</span>

							</div>
							
						</div>
					</nav>
				</div>
			</div>
		);
	}
}
