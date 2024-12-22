import { Modal, Button } from "flowbite-react"
import { useState } from "react";
import CountdownTimer from "../counter/time-counter.component";
import authSvc from "../../pages/auth/auth.service";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const OTPModal = ({otpModel=false, setOtpModel, email}) => {
    const [otp, setOtp] = useState()
    const [errmsg, setErrMsg] = useState();
    const [timer, setTimer] = useState(5)

    const navigate = useNavigate()

    const resendOtp = async(e) => {
        e.preventDefault()
        try {
            
            const response = await authSvc.resendOTP({
                email: email
            })
            setErrMsg('');
            setTimer(5)
        } catch(exception) {

        }
    }

    const activateUser = async (e) => {
        try {
            e.preventDefault()

            const payload = {
                email: email, 
                otp: otp
            }
            const response = await authSvc.activateUsingOTP(payload)
            toast.success("Your account has been activated")
            navigate("/login")
        } catch(exception) {
            if(exception.status === 410) {
                setErrMsg("Otp Code Expired")
            } else {
                toast.error("Cannot activate your account. Please check your email or your otp code")
            }
        }
    }
    return (<>
        <Modal show={otpModel} onClose={() => setOtpModel(false)}>
                <Modal.Header>Activate Using OTP</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <input
                            type={'text'}
                            onChange={(e) => {
                                setOtp(e.target.value)
                            }}
                            className={`
                                bg-gray-50 
                                border 
                                border-gray-300 
                                text-gray-900 
                                rounded-lg 
                                focus:ring-primary-600 
                                focus:border-primary-600 
                                block 
                                w-full 
                                p-2 
                                dark:bg-gray-700
                                dark:border-gray-600 
                                dark:placeholder-gray-400 
                                dark:text-white 
                                dark:focus:ring-blue-500 
                                dark:focus:border-blue-500`}
                            placeholder={'Enter your OTP code'}
                        />
                        {
                            errmsg ? <span className="text-red-600">
                                {errmsg} <NavLink onClick={resendOtp} className={'text-teal-800 hover:cursor-pointer'} to={'/'}>Resend?</NavLink>
                            </span> : <span className="text-black">Resend otp code after <CountdownTimer minutes={timer}/></span>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={activateUser}>Activate</Button>
                    <Button color="red" onClick={() => setOtpModel(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
    </>)
}

export default OTPModal;