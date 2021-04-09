import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import {
    createUserWithEmailandPassword,
    handleGoogleSignIn,
    handleSignOut,
    initializeLoginFramework,
    loginWithEmailAndPassword,
} from "./LoginManager";

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isLoggedIn: false,
        // newUser: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        // error: "",
        // success: false,
    });
    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn().then((res) => {
            handleResponse(res, true);
        });
    };
    const signOut = () => {
        handleSignOut().then((res) => {
            handleResponse(res, false);
        });
    };

    const handleBlur = (event) => {
        let isFormValid = true;
        if (event.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const passwordLength = event.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = passwordLength && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    };
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailandPassword(
                user.name,
                user.email,
                user.password
            ).then((res) => {
                handleResponse(res, true);
            });
        }
        if (!newUser && user.email && user.password) {
            loginWithEmailAndPassword(user.email, user.password).then((res) => {
                handleResponse(res, true);
            });
        }
        e.preventDefault();
    };
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    };

    return (
        <div style={{ textAlign: "center" }} className="Login">
            {user.isLoggedIn ? (
                <button onClick={signOut}>Sign Out</button>
            ) : (
                <button onClick={googleSignIn}>Sign in With Google</button>
            )}
            {user.isLoggedIn && (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <p>{user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <h1>Our Own Authentication</h1>
                <input
                    type="checkbox"
                    onChange={() => {
                        setNewUser(!newUser);
                    }}
                    name="newUser"
                    id=""
                />
                <label htmlFor="newUser">New user Sign Up</label>
                <br />
                {newUser && (
                    <input
                        name="name"
                        type="text"
                        onBlur={handleBlur}
                        placeholder="Write your Name"
                    />
                )}
                <br />
                <input
                    name="email"
                    type="text"
                    onBlur={handleBlur}
                    placeholder="Write your Email"
                    required
                />
                <br />
                <input
                    name="password"
                    type="text"
                    onBlur={handleBlur}
                    placeholder="password"
                    required
                />
                <br />
                <input type="submit" value={newUser ? "Sign Up" : " Sign In"} />
                <p></p>
                <p style={{ color: "red" }}>{user.error}</p>

                {user.success && (
                    <p style={{ color: "green" }}>
                        Account {newUser ? "Created" : "Login"} Successfully
                    </p>
                )}
            </form>
        </div>
    );
}

export default Login;
