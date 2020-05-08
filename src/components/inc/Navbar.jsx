import React from 'react';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="https://novakved.github.io/my-app/">Grafička metoda rješavanja problema LP</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="https://novakved.github.io/my-app/">Početna stranica <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/NovakVed/my-app" target="_blank">Pogledaj kod</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Dokumentacija</a>
                        </li> */}
                    </ul>
                </div>
            </nav>
            <br />
        </div>
    )
}

export default Navbar;