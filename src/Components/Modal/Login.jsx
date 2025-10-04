import React from "react";
import {Modal} from "flowbite-react"
import google from "../../assets/google.png"
import mobile from "../../assets/mobile.svg"
import guitar from "../../assets/guita.png"
import love from "../../assets/love.png"
import avatar from "../../assets/avatar.png"
import close from "../../assets/close.svg";

const Login = ({onClose,show}) => {
    return (
        <div>
            <Modal onClose={onClose} show={show}>
                <div>
                    <p>This is your modal</p>
                </div>
            </Modal>
        </div>
    )
}

export default Login