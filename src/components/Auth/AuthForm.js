import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [sendingRequest,setSendingRequest]=useState(false);

  const AuthCtx= useContext(AuthContext);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const history=useHistory()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    setSendingRequest(true)

    const enterdEmail=emailInputRef.current.value;
    const enterdPassword=passwordInputRef.current.value;
    let url;
    if(isLogin){
    url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDML3nMlIMsaSBUM4gV7xe8wTxyl6ADNjs';
    }else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDML3nMlIMsaSBUM4gV7xe8wTxyl6ADNjs';
    }
    fetch(url,{
      method:'POST',
      body:JSON.stringify({
        email:enterdEmail,
        password:enterdPassword,
        returnSecureToken:true
      }),
      headers:{
        'Content-type':'application/json'
      }
    }).then((res)=>{
      setSendingRequest(false)
      if(res.ok){
        return res.json();
        
      }else{
          return res.json().then((data)=>{
        
            console.log(data.error.message);
              throw new Error(data.error.message);
          })
      }
    })
    .then((data)=>{
      AuthCtx.login(data.idToken);
      history.replace('/profile')
    })
    .catch((error)=>{
      console.log(error.message)
    })

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {sendingRequest && <p>Sending Request...</p>}
         {!sendingRequest && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
