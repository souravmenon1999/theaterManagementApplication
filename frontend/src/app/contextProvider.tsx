 // Ensure this runs on the client side
 
 'use client';

import React, { createContext, useState, ReactNode } from "react";

interface ClientContextProviderProps {
    children: ReactNode;
}


// Define the context value type
interface ContextValue {
    component1: boolean;
    component2: boolean;
    component1Click: () => void;
    component2Click: () => void;
}

// Create context with default values
const Context = createContext<ContextValue>({
    component1: true,
    component2: false,
    component1Click: () => {},
    component2Click: () => {}
});



// Define the context provider component
const ClientContextProvider = ({ children }: ClientContextProviderProps) => {


// Define the props for the provider component
    const [context, setContext] = useState({
        component1: true,
        component2: false,
    });

    const component1Click = () => {
        setContext({
            component1: true,
            component2: false,
        });
        
        console.log(context)
    };

    const component2Click = () => {
        setContext({
            component1: false,
            component2: true,
        });
        console.log(context);
    };

    return (
        <Context.Provider value={{ ...context, component1Click, component2Click }}>
            {children}
        </Context.Provider>
    );
};

export  { Context, ClientContextProvider };