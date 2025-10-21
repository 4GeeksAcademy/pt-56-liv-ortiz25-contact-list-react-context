import React, { useContext } from "react";
import { Context } from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Contacts = ({ contact, delContact }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const editContact = () => {
        actions.setContact(contact);
        navigate(`/edit/${contact.id}`);
    };

    return (
        <div className="card mb-3 shadow-sm border-0 rounded-3">
            <div className="row g-0 align-items-center">
                <div className="col-md-3 text-center p-3">
                    <i className="fas fa-user-circle fa-4x text-secondary"></i>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title fw-bold">{contact.name}</h5>
                        <p className="card-text mb-1"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
                        <p className="card-text mb-1"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
                        <p className="card-text"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
                    </div>
                </div>
                <div className="col-md-2 text-end p-3">
                    <button className="btn btn-outline-primary btn-sm me-2" onClick={editContact}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => delContact(contact)}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
