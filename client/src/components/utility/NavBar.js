import React from "react";

export default function NavBar(props) {
    const links = [
        {
            name: 'dashboard',
            title: 'Podsumowanie',
            href: '/',
        }, 
        {
            name: 'projects',
            title: 'Projekty',
            href: '/projects',
        }, 
        {
            name: 'patients',
            title: 'Pacjenci',
            href: '/patients',
        },
        {
            name: 'tests',
            title: 'Badania',
            href: '/tests',
        }
    ];
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Medical Center</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {links.map(link => {
                        return (
                            <li className="nav-item" key={link.name}>
                                { props.currentPage == link.name ? <a className="nav-link active" aria-current="page" href={link.href}>{link.title}</a> : <a className="nav-link" href={link.href}>{link.title}</a> }
                            </li>
                        );
                    })}
                </ul>
                </div>
            </div>
        </nav>
    );
};
