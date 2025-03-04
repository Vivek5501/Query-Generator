import Header from "./Header";
import { checkValidate } from "../utils/validate";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null); 
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
    };

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        let message;
        if (!isSignInForm) {
            message = checkValidate(email.current.value, password.current.value, name.current?.value);
        } else {
            message = checkValidate(email.current.value, password.current.value, null);
        }
        setErrorMessage(message); 
        if(message) return;

        if(!isSignInForm){
        // SignUp Logic
        createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
        )
            .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name.current.value, 
            })
                .then(()=>{
                const {uid, email, displayName} = auth.currentUser;
                dispatch(
                    addUser({
                    uid:uid,
                    email:email, 
                    displayName:displayName
                }));
                })
                .catch((error)=>{
                setErrorMessage(error.message)
                });
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode, '-', errorMessage)
            });

        } else {
            // SignIn Logic
            signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
        )
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode, '-', errorMessage);
            });
        }
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                className="h-screen object-cover"
                src=""
                alt="logo"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full md:w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
            >
                <h1 className="font-bold text-3xl py-4">
                {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Enter your Full Name"
                        className="p-4 my-4 w-full bg-gray-700"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="Enter your Email Address"
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Enter your Password"
                    className="p-4 my-4 w-full bg-gray-700"
                />
                {errorMessage && (
                    <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
                )}
                <button
                    className="p-4 my-6 bg-red-700 w-full rounded-lg"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm
                        ? "New to DataWise? Sign up Now"
                        : "Already registered? Sign In Now"}
                </p>
            </form>
        </div>
    );
};

export default Login;