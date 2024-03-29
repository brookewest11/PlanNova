import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logopic from "./logostars2.png";
import { useNavigate } from "react-router-dom";
import { any } from "prop-types";
import { useUser } from "./User";

declare module "*.png"; //needed for logo

// functional component that takes props as argument
const Login = (props: any) => {
    // const [state, setState] = useState("")
        // state = variable to access current state
        // setState = function to update state
        // useState("") inital state

        useEffect(() => {
            // Request permission for notifications
            Notification.requestPermission();
          }, []);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { setUserName } = useUser();
    
    // navigate to diff routes 
    const navigate = useNavigate();
        
    // handle when login button is clicked
    const onButtonClick = () => {
        (async () => {
            try {
              const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: email, password: password }),
                credentials: 'include',
              });
            

              const data = await response.json();
      
              if (data.success) {
                // login successful
                setLoginSuccess(true);
                console.log('userName from useUser:', email);
                // pass the username to the Meal Plan page
                setUserName(email);
                //navigate("/meal-planning", { state: { userName : email } });
                // redirect to home page
                navigate("/home");
              } else {
                // login failed
                setLoginSuccess(false);
              }

                // Log the response from the server
                console.log("Server Response:", data);
            } catch (error) {
              console.error("An error occurred:", error);
            }
          })();
    }

    // handle when register button is clicked
    const onRegisterClick = () => {
        // Redirect to registration page
        navigate("/new-user");
    };

    return <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logopic} style={{ height: '35px', marginRight: '0px', marginTop: '10px', filter: 'brightness(50%) saturate(0%)' }} />
            <div style={{ fontFamily: 'Outfit', color: 'black', fontSize: '40px', marginTop: '10px' }}>PlanNova</div>
        </div>

        {/* code for title and logo above: ^  */}
        {/* code for the login card below:  */}
            
            <div className={"mainContainer"}>
                <div className="card-layout">
                    <div className={"titleContainer"}>
                        <div className="login-title">Login</div>
                    </div>
                        <br />
                        <div className={"inputContainer1"}>
                            {/* bound to email state variable
                                onChange triggered when user types into the input field
                                    set to setEmail that updates the email state with the current value of the input field (ev.target.value)
                                errorLabel: display error messages related to the email input field
                            */}
                            <input
                                value={email}
                                placeholder="Enter your username here"
                                onChange={ev => setEmail(ev.target.value)}
                                className={"inputBox"} />
                            <label className="errorLabel">{emailError}</label>
                        </div>
                        <br />
                        <div className={"inputContainer2"}>
                            <input
                                value={password}
                                type="password"
                                placeholder="Enter your password here"
                                onChange={ev => setPassword(ev.target.value)}
                                className={"inputBox"} />
                            <label className="errorLabel">{passwordError}</label>
                        </div>
                        <br />
                        <div className={"inputButton"}>
                            {/* <div className="nav"><Link to="/home" className="links">login</Link></div> */}
                            <input
                                className={"loginButton"}
                                type="button"
                                onClick={onButtonClick}
                                value={"Log in"} />
                        </div> 
                        <div className={"inputButton"}>
                            <input
                                className={"RegisterButton"}
                                type="button"
                                onClick={onRegisterClick}
                                value={"New User"} />
                        </div>
                        
                </div>
            </div></>
}

export default Login