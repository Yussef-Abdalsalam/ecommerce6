import { createContext, useState } from "react";

export let nameContext = createContext();

export default function NameContextProvider(props) {

    const [userName, setUserName] = useState("");

    return <nameContext.Provider value={{userName, setUserName}}>

        {props.children}
        
    </nameContext.Provider>
}