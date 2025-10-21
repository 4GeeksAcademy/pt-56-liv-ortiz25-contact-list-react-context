import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light shadow-sm mb-4">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="navbar-brand fw-bold text-primary-emphasis fs-4">
                    Contact List
                </Link>

                <Link to="/add" className="text-decoration-none">
                    <button className="btn btn-success px-3 py-2 fs-6 fw-semibold">
                        <i className="fa-solid fa-user-plus me-2"></i>
                        Add New Contact
                    </button>
                </Link>
            </div>
        </nav>
    );
};
