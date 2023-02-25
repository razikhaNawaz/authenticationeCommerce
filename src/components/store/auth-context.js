import React, {useState} from 'react';

const AuthContext=React.createContext({
   token :'', //set to empty string
   isLoggedIn : false,
   login:(token)=>{},
   logout: ()=>{}
})
//initialize this context with initial data
export const AuthContextProvider=(props) =>{
    const [token, setToken]=useState(null);
    
    const userIsLoggedIn=!!token; //if token is string and that is not empty that returns true, if token is string and that is empty then returns false
    
    const loginHandler=(token)=>{
        setToken(true);
    }
    const logoutHandler=()=>{
        setToken(null);
    }

    const contextValue={
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;