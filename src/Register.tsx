import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";
import { Link } from "react-router-dom";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,24}$/;

// endpoint for our registration in our backend api
const REGISTER_URL = '/user/register';

const Register = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        //if(userRef.current !== null)
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(EMAIL_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ firstName: "test", lastName: "test", email: user, password: pwd, idRole: 1 }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.data.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser("");
            setPwd("");
            setMatchPwd("");
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg("Pas de réponse serveur");
            } else if (err.response?.status === 409) {
                setErrMsg("Email déjà utilisé");
            } else {
                setErrMsg("Inscription pas réussi")
            }
            if(errRef.current !== null)
            errRef.current.focus();
        }

    }

    // if success sign up, then show sign in link and success message. Otherwize show sign up form.
    return (
        <>
            {success ? (
                <section>
                    <h1>Succès !</h1>
                    <p>
                        <a href="#">Connexion</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Inscription</h1>
                    <form onSubmit={handleSubmit}> {/* submit event for the form */}
                        <label htmlFor="email"> {/* htmlFor needs to match the id of the input */}
                            Email:
                            {/*  if valid user: show faCheck icon, else hide */}
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            {/*  if valid user or user state false (nothing in input): hide faTimes icon, else display red X next to label */}
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email" // should match htmlFor in the label
                            ref={userRef} // reference to set focus on the input
                            autoComplete="off" // we don't want previous values selected for this field
                            onChange={(e) => setUser(e.target.value)} // ties the input to the user state
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"} // if user email is valid : false  - helps required
                            aria-describedby="uidnote" // requirements of the input
                            onFocus={() => setUserFocus(true)} // focus true when enter input field
                            onBlur={() => setUserFocus(false)} // focus to false if we leave the input field
                        />

                        {/* if input user field is focused and user state is not empty (we have entered something in the field)
                        and if field is not valid we will show this message. If valid ? offscreen: taken off the screen with an absolute position in css */}
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 à 24 caractères.<br />
                            Doit commencer par une lettre<br />
                            Lettres, chiffres, underscore, traits d'union autorisés.
                        </p>


                        <label htmlFor="password">
                            Mot de passe:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            // no focus on pass field when page loads
                            type="password" // autocomplete not supported on type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        {/*  display pass note when we set focus on password field and password regex not valid */}
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            6 à 24 caractères<br />
                            Doit inclure des lettres majuscules, minuscules et un chiffre<br />
                            Caractères spéciaux autorisés : <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirmer le mot de passe:
                            {/*  must have valid match regex and matchpwd state must be true for faCheck icon to show */}
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Doit correspondre au premier champ de saisie du mot de passe.
                        </p>

                        {/*  button disabled until all the fields are validated  */}
                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                    Déjà inscrit?<br />
                        <span className="line">
                            {/*  react router link for sign in form */}
                            {/*  <Link to="/">Sign In</Link> */}
                            <a href="#">Se connecter</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register