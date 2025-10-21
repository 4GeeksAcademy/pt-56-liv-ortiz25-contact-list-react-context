import React, { useState, useEffect } from "react";
import initialStore from "../store.js";

export const Context = React.createContext(null);

const addContext = (WrappedComponent) => {
    const StoreComponent = (props) => {
        const [state, setState] = useState(
            initialStore({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: { ...state.store, ...updatedStore },
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            state.actions.getContacts();
        }, []);

        return (
            <Context.Provider value={state}>
                <WrappedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreComponent;
};

export default addContext;
