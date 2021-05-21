import React, { useState } from 'react';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home';
// import Modal from "./Components/Modal/Modal"
import Signup from "./Components/Signup/Signup"

interface Props {

}

const Container = (props: Props) => {
    const [show, setShow] = useState(false);
    const [isSignup, setSignup] = useState(false);

    const toggleModal = () => {
        setShow(!show);
    }
    const signUp = () => {
        setSignup(true);
        setShow(true)
    }
    const signIn = () => {
        setSignup(false)
        toggleModal()
        setShow(true)
    }
    return (
        <div>
            <Header toggle={toggleModal} signUp={signUp} signIn={signIn} />
            <Home />
            <Signup show={show} toggle={toggleModal} isSignup={isSignup} signIn={signIn} signUp={signUp} />
            <Footer />
        </div>
    )
}

export default Container
