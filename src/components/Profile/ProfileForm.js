import { useRef, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
const history=useHistory();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    //we need to add validation here
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmGDvT90mBNRFDiFt_w3Haf-eC_lW9aZc',
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.tokenValue,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace('/');
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
