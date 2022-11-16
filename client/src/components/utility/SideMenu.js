import React, { useState } from "react";
import '../../styles/navbar/navbar.css';
import { NavLink } from "react-router-dom";

export default function SideMenu(props) {
    const links = [
        {
            name: 'dashboard',
            icon: 'bi bi-house-door-fill',
            title: 'Podsumowanie',
            href: '/',
        }, 
        {
            name: 'projects',
            icon: 'bi bi-diagram-3-fill',
            title: 'Projekty',
            href: '/projects',
        }, 
        {
            name: 'patients',
            icon: 'bi bi-people-fill',
            title: 'Pacjenci',
            href: '/patients',
        },
        {
            name: 'examinations',
            icon: 'bi bi-heart-pulse-fill',
            title: 'Badania',
            href: '/examinations',
        }
    ];

    // Changes when user hovers over hide menu button (#hide-nav-button)
    const [hover, setHover] = useState(false);

    return (
        <nav className={props.menuOpen ? (hover ? "navbar slide" : "navbar") : "navbar hidden"}>
            <div className="navbar-container">
                <button id="hide-nav-button"
                    onMouseEnter={() => { setHover(true); }}
                    onMouseLeave={() => { setHover(false); }}
                    onClick={() => { props.closeMenu(); }}>
                    <i className="bi bi-chevron-left"></i>
                </button>
                <div className="nav-image">
                    <img src="/mc-icon.png" alt="navbar-image" />
                    <h2 className="title">Medical Center</h2>
                </div>
                <ul className="navbar-nav toggled">
                    {links.map(link => {
                        return (
                            <NavLink key={link.name} to={link.href}>
                                <li 
                                    className={props.currentPage == link.name ? "nav-link active" : "nav-link"} >
                                        <i className={link.icon}></i>
                                        {link.title}
                                </li>
                            </NavLink>
                        );
                    })}
                </ul>
                <div className="version-info">
                    <p>v 1.0.0</p>
                </div>
            </div>
        </nav>
    );
};
