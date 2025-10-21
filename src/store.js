const initialStore = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            contact: null
        },
        actions: {
            createAgenda: async () => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/contacts_gavotroll`, {
                        method: "POST"
                    });
                    if (response.ok) {
                        console.log("Agenda created successfully");
                        getActions().getContacts();
                    }
                } catch (error) {
                    console.error("Error creating agenda:", error);
                }
            },

            getContacts: async () => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/contacts_gavotroll/contacts`);
                    if (response.status === 404) {
                        await getActions().createAgenda();
                        return;
                    }
                    const data = await response.json();
                    setStore({ contacts: data.contacts || [] });
                } catch (error) {
                    console.error("Error getting contacts:", error);
                    setStore({ contacts: [] });
                }
            },

            addContact: async (contact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/contacts_gavotroll/contacts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        await getActions().getContacts();
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error creating contact:", error);
                    return false;
                }
            },

            updateContact: async (id, contact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/contacts_gavotroll/contacts/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        await getActions().getContacts();
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error updating contact:", error);
                    return false;
                }
            },

            delContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/contacts_gavotroll/contacts/${id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        await getActions().getContacts();
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error deleting contact:", error);
                    return false;
                }
            },

            setContact: (contact) => setStore({ contact })
        }
    };
};

export default initialStore;

