import React from "react";
import '../../styles/navbar/navbar.css';
import { Link } from "react-router-dom";

export default function SideMenu(props) {
    const links = [
        {
            name: 'dashboard',
            icon: 'bi bi-speedometer2',
            title: 'Podsumowanie',
            href: '/',
        }, 
        {
            name: 'projects',
            icon: 'bi bi-clipboard-data',
            title: 'Projekty',
            href: '/projects',
        }, 
        {
            name: 'patients',
            icon: 'bi bi-person',
            title: 'Pacjenci',
            href: '/patients',
        },
        {
            name: 'examinations',
            icon: 'bi bi-eyeglasses',
            title: 'Badania',
            href: '/examinations',
        }
    ];

    return (
        <nav className={props.menuOpen ? "navbar" : "navbar hidden"}>
            <div className="navbar-container">
                <button id="hide-nav-button" onClick={() => { props.closeMenu(); }}>
                    <i className="bi bi-arrow-left"></i>
                </button>
                <div className="nav-image">
                    <img src="/mc-icon.png" alt="navbar-image" />
                    <h2 className="title">Medical Center</h2>
                </div>
                <ul className="navbar-nav toggled">
                    {links.map(link => {
                        return (
                            <Link key={link.name} to={link.href}>
                                <li 
                                    className={props.currentPage == link.name ? "nav-link active" : "nav-link"} >
                                        {link.title}
                                </li>
                            </Link>
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
