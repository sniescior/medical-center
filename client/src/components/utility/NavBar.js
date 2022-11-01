import React, { useState } from "react";
import '../../styles/navbar/navbar.css';

export default function NavBar(props) {
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
            name: 'tests',
            icon: 'bi bi-eyeglasses',
            title: 'Badania',
            href: '/tests',
        }
    ];

    return (
        <nav className={props.navOpen ? "navbar" : "navbar hidden"}>
            <div className="navbar-container">
                <button id="hide-nav-button" onClick={() => { props.setNavOpen(false); }}>
                    <i className="bi bi-arrow-left"></i>
                </button>
                <div className="nav-image">
                    <img src="/mc-icon.png" alt="navbar-image" />
                    <h2 className="title">Medical Center</h2>
                </div>
                <ul className="navbar-nav toggled">
                    {links.map(link => {
                        return (
                            <li 
                                key={link.name}
                                className={props.currentPage == link.name ? "nav-link active" : "nav-link"} 
                                onClick={() => {
                                    props.setCurrentPage(link.name);
                                }}>
                                    {link.title}
                            </li>
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
