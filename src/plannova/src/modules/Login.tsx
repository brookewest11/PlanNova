
import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logopic from "./logostars.png";
import { useNavigate } from "react-router-dom";

declare module "*.png"; //needed for logo 

const Login = (props: any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {
        // You'll update this function later...
    }

    return <><div className="logo_container_login">
        <img src={logopic} className="logopic_login" />
        <div className="logo_login">PlanNova</div>
        </div>

        {/* code for title and logo above: ^  */}
        {/* code for the login card below:  */}
            
            <div className={"mainContainer"}>
                <div className="login-card">
                    <div className={"titleContainer"}>
                        <div>LOGIN</div>
                    </div>
                        <br />
                        <div className={"inputContainer"}>
                            <input
                                value={email}
                                placeholder="Enter your email here"
                                onChange={ev => setEmail(ev.target.value)}
                                className={"inputBox"} />
                            <label className="errorLabel">{emailError}</label>
                        </div>
                        <br />
                        <div className={"inputContainer"}>
                            <input
                                value={password}
                                type="password"
                                placeholder="Enter your password here"
                                onChange={ev => setPassword(ev.target.value)}
                                className={"inputBox"} />
                            <label className="errorLabel">{passwordError}</label>
                        </div>
                        <br />
                        <div className={"inputContainer"}>
                            <div className="nav"><Link to="/home" className="links">login</Link></div>
                            {/* we will need this to implement on click functionality  */}
                            {/* <input
                                className={"inputButton"}
                                type="button"
                                onClick={onButtonClick}
                                value={"Log in"} /> */}
                        </div> 
                       
                        
                </div>
            </div></>
}

export default Login