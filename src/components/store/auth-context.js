import React, {useState} from 'react';

const AuthContext=React.createContext({
   token :'', //set to empty string
   isLoggedIn : false,
   login:(token)=>{},
   logout: ()=>{},
  tokenValue: ''
})
//initialize this context with initial data
export const AuthContextProvider=(props) =>{
    const initialToken= localStorage.getItem('token')
    const [token, setToken]=useState(initialToken);
    const [tokenVal, setTokenVal]=useState(null);
    
    const userIsLoggedIn=!!token; //if token is string and that is not empty that returns true, if token is string and that is empty then returns false
    
    const loginHandler=(token)=>{
        setToken(true);
        setTokenVal(token);
        localStorage.setItem('token', token);
    }
    
    const logoutHandler=()=>{
        setToken(null);
        setTokenVal(null);
        localStorage.removeItem('token');
    }

    const contextValue={
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        tokenValue:tokenVal
    }
    return (
        <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;