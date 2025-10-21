import React, { useContext, useState, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer.jsx";
import { useNavigate, useParams } from "react-router-dom";

export const CreateContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = Boolean(id);

    const [contactDetails, setContactDetails] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (isEditing && store.contact) {
            const { name, email, phone, address } = store.contact;
            setContactDetails({ name, email, phone, address });
        }
    }, [isEditing, store.contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, address } = contactDetails;

        if (!name || !email || !phone || !address) {
            alert("Please complete all the fields before saving.");
            return;
        }

        const success = isEditing
            ? await actions.updateContact(id, contactDetails)
            : await actions.addContact(contactDetails);

        if (success) {
            navigate("/");
        } else {
            alert("An error occurred. The contact was not saved.");
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <h1 className="text-center mb-4 fw-bold">
                        {isEditing ? "Edit Contact" : "Add New Contact"}
                    </h1>
                    <form onSubmit={handleSubmit} className="shadow-sm p-4 rounded bg-light">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter full name"
                                value={contactDetails.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email address"
                                value={contactDetails.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="form-control"
                                placeholder="Enter phone number"
                                pattern="[0-9]{8,15}"
                                title="Only digits, between 8 and 15 characters"
                                value={contactDetails.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                placeholder="Enter address"
                                value={contactDetails.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100 mb-2">
                            {isEditing ? "Update Contact" : "Save Contact"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-link w-100 text-decoration-none"
                            onClick={() => navigate("/")}
                        >
                            <i>← Go back to your contact list</i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
