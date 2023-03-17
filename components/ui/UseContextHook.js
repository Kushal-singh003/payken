
import { createContext, useContext } from "react";
import React, { useState } from "react";

export const ConfigContext = createContext();

function ConfigProvider({ children }) {
       const [config, setConfig] = useState([]);
    return (
    <ConfigContext.Provider value={{config, setConfig}}>
            {children}
    </ConfigContext.Provider>
 );
}

export default ConfigProvider;