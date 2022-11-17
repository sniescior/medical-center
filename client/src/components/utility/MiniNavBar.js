import React from "react";

export default function MiniNavBar(props) {
    return (
        <nav className={props.menuOpen ? "navbar mini hidden" : "navbar mini"}>
            <div className="navbar-container">
                <button id="show-nav-button" onClick={() => { props.openMenu(); }}>
                    <i className="bi bi-list"></i>
                </button>
                <div className="wrapper vertical">
                    <div className="nav-image">
                        <img src="/mc-icon.png" alt="logo" />
                    </div>
                    <div className="version-info">
                        <p>v 1.0.0</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

