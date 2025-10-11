import React, { useEffect, useState } from "react";
import { Modal, Carousel, ModalBody } from "flowbite-react";
import google from "../../assets/google.png";
import mobile from "../../assets/mobile.svg";
import guitar from "../../assets/guita.png";
import love from "../../assets/love.png";
import avatar from "../../assets/avatar.png";
import close from "../../assets/close.svg";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../Firebase/Firebase";

const Login = ({ toggleModal, status }) => {
    const [authMethod, setAuthMethod] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        if(status) {
            resetForm();
        }
    },[status]);

    const getFirebaseErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'This email is already registered. Please log in or use a different email.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/user-not-found':
                return 'No account found with this email. Please sign up to create an account.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again or reset your password.';
            case 'auth/weak-password':
                return 'Password is too weak. It must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please wait a moment and try again.';
            case 'auth/invalid-credential':
                return 'Invalid credentials provided. Please check your email and password.';
            case 'auth/user-disabled':
                return 'This account has been disabled. Please contact support.';
            case 'auth/operation-not-allowed':
                return 'This sign-in method is not enabled. Please contact support.';
            case 'auth/account-exists-with-different-credential':
                return 'An account already exists with this email but with a different sign-in method. Try signing in with Google or another method.';
            case 'auth/requires-recent-login':
                return 'This operation requires recent authentication. Please log in again and try.';
            case 'auth/network-request-failed':
                return 'Network error. Please check your internet connection and try again.';
            case 'auth/popup-closed-by-user':
                return 'Google sign-in was canceled. Please try again.';
            case 'auth/popup-blocked':
                return 'The sign-in popup was blocked by your browser. Please allow popups and try again.';
            default:
                return `An unexpected error occurred: ${errorCode}. Please try again or contact support.`;
        }
    };

    const validateInputs = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (isSignup && !passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character';
        }

        if (isSignup && password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            toggleModal();
            console.log("User : ", result.user);
        } catch (error) {
            setErrors({ general: getFirebaseErrorMessage(error.code) });
        }
    };

    const handleEmailAuth = async () => {
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (isSignup) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            toggleModal();
        } catch (err) {
            setErrors({ general: getFirebaseErrorMessage(err.code) });
        }
    };

    const resetForm = () => {
        setAuthMethod(null);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsSignup(false);
        setErrors({});
    };

    const handleToggleModal = () => {
        resetForm();
        toggleModal();
    };

    return (
        <div>
            <Modal
                theme={{
                    "content": {
                        "base": "relative w-full p-4 md:h-auto",
                        "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
                    },
                }}
                onClick={handleToggleModal}
                show={status}
                className="bg-black rounded-none"
                position={"center"}
                size="md"
                popup={true}
            >
                <div onClick={(e) => e.stopPropagation()} className="p-6 pl-2 pr-2 bg-white">
                    <img
                        onClick={handleToggleModal}
                        src={close}
                        alt=""
                        className="w-6 absolute z-10 top-4 right-4 cursor-pointer"
                    />
                    <Carousel
                        slide={false}
                        theme={{
                            "indicators": {
                                "active": {
                                    "off": "bg-gray-300",
                                    "on": "bg-teal-300"
                                },
                                "base": "h-2 w-2 rounded-full",
                                "wrapper": "absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3"
                            },
                            "scrollContainer": {
                                "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
                                "snap": "snap-x"
                            },
                            "control": {
                                "base": "inline-flex items-center justify-center bg-transparent",
                                "icon": "w-8 text-white dark:text-black"
                            },
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-56 pb-5 rounded-none"
                    >
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 pb-5" src={guitar} alt="Card Image 1" />
                            <p style={{ color: "#002f34" }} className="w-60 sm:w-72 text-center pb-5 font-semibold">
                                Help us become one of the safest place to buy and sell.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 pb-5" src={love} alt="Card Image 2" />
                            <p style={{ color: "#002f34" }} className="w-60 sm:w-72 text-center pb-5 font-semibold">
                                Close deals from the comfort of your home.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 pb-5" src={avatar} alt="Card Image 3" />
                            <p style={{ color: "#002f34" }} className="w-60 sm:w-72 text-center pb-5 font-semibold">
                                Keep all your favourites in one place.
                            </p>
                        </div>
                    </Carousel>
                </div>

                <ModalBody className="bg-white h-auto p-0 rounded-none" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6 pt-0">
                        {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}
                        {authMethod === null || authMethod === 'phone' ? (
                            <>
                                <div
                                    onClick={() => setAuthMethod('phone')}
                                    className="flex items-center justify-center rounded-md border-2 border-solid border-gray-300 p-5 pl-4 relative h-8 mb-4 cursor-pointer"
                                >
                                    <img className="w-6 mr-2" src={mobile} alt="" />
                                    <p className="text-sm font-bold">Continue with phone</p>
                                </div>
                                <div
                                    onClick={handleGoogleSignIn}
                                    className="flex items-center justify-center rounded-md border-2 border-solid border-gray-300 p-5 relative h-8 cursor-pointer active:bg-teal-100"
                                >
                                    <img className="w-7 absolute left-2" src={google} alt="" />
                                    <p className="text-sm text-gray-500">Continue with Google</p>
                                </div>

                                <div className="pt-5 flex flex-col items-center justify-center">
                                    <p className="font-semibold text-sm">OR</p>
                                    <p
                                        onClick={() => setAuthMethod('email')}
                                        className="font-bold text-sm pt-3 underline underline-offset-4 cursor-pointer"
                                    >
                                        Login with Email
                                    </p>
                                </div>

                                <div className="pt-10 sm:pt-20 flex flex-col items-center justify-center">
                                    <p className="text-xs">All your personal details are safe with us.</p>
                                    <p className="text-xs pt-5 text-center">
                                        If you continue, you are accepting OLX Terms and Conditions and Privacy Policy
                                    </p>
                                </div>
                            </>
                        ) : authMethod === 'email' ? (
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-center">{isSignup ? 'Sign Up' : 'Login'} with Email</h2>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setErrors((prev) => ({ ...prev, email: null }));
                                        }}
                                        placeholder="Email"
                                        className={`w-full border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-teal-300`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrors((prev) => ({ ...prev, password: null }));
                                        }}
                                        placeholder="Password"
                                        className={`w-full border-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-teal-300`}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                                {isSignup && (
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setErrors((prev) => ({ ...prev, confirmPassword: null }));
                                            }}
                                            placeholder="Confirm Password"
                                            className={`w-full border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-teal-300`}
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                )}
                                <button
                                    onClick={handleEmailAuth}
                                    className="w-full p-3 rounded-md text-white bg-teal-600 hover:bg-teal-700 mb-4"
                                >
                                    {isSignup ? 'Sign Up' : 'Login'}
                                </button>
                                <p
                                    onClick={() => {
                                        setIsSignup(!isSignup);
                                        setErrors({});
                                        setPassword('');
                                        setConfirmPassword('');
                                    }}
                                    className="text-center text-sm underline cursor-pointer mb-2"
                                >
                                    {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                                </p>
                                <p onClick={resetForm} className="text-center text-sm underline cursor-pointer">
                                    Back to options
                                </p>
                            </div>
                        ) : null}
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Login;