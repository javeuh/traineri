import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigator = () => {
    return (
        <Navbar sticky="top" bg="dark" variant="dark" expand="md">
            <Navbar.Brand>
                {" "}
                <NavLink exact className="navbar-brand white-text-nav" to="/">
                    Personal Trainer
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink
                        className="nav-link white-text-nav"
                        activeClassName="active-link"
                        to="/customers"
                    >
                        Customers
                    </NavLink>
                    <NavLink
                        className="nav-link white-text-nav"
                        activeClassName="active-link"
                        to="/trainings"
                    >
                        Trainings
                    </NavLink>
                    <NavLink
                        className="nav-link white-text-nav"
                        activeClassName="active-link"
                        to="/calendar"
                    >
                        Calendar
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigator;
