import React, { useContext } from "react";
import { Context } from "../hooks/useGlobalReducer.jsx";
import { Contacts } from "../components/Contacts.jsx";

export const Home = () => {
    const { store, actions } = useContext(Context);

    const handleDelete = async (contact) => {
        if (contact && confirm(`Delete ${contact.name}?`)) {
            const success = await actions.delContact(contact.id);
            if (success) console.log("Deleted contact successfully");
        }
    };

    return (
        <div className="container my-4">
            {store.contacts.length === 0 ? (
                <div className="alert alert-primary text-center" role="alert">
                    <h2>No contacts</h2>
                </div>
            ) : (
                store.contacts.map((contact) => (
                    <Contacts key={contact.id} contact={contact} delContact={handleDelete} />
                ))
            )}
        </div>
    );
};
