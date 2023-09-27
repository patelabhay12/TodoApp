import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = ({ searchText, setSearchText }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    useEffect(() => {
        const u = localStorage.getItem('user');
        setUser(u);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        return;
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">TODO APP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home
                                    <span className="visually-hidden">(current)</span>
                                </Link>
                            </li>

                            {
                                user ? (
                                    <li className="nav-item">
                                        <a className="nav-link active"
                                            onClick={handleLogout}
                                            style={{ cursor: "pointer" }}
                                        >Logout</a>
                                    </li>
                                )
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/register">Register</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/login">Login</Link>
                                        </li>
                                    </>

                            }


                        </ul>


                        {
                            user && (
                                <form className="d-flex">
                                    <input
                                        className="form-control me-sm-2"
                                        type="search"
                                        name='text'
                                        value={searchText}
                                        onChange={(e) => { setSearchText(e.target.value) }}
                                        placeholder="Search"
                                    />
                                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            )
                        }
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header;