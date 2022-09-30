import React,{createContext} from "react";

export const AuthContext = createContext({
    uid : "",
    setuid : (u)=>{},
});

export const AuthProvider = AuthContext.Provider;