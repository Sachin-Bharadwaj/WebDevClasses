import { Button } from "../components/Button";
import { InputComponent } from "../components/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try{
            console.log(`${BACKEND_URL}/api/v1/signup`)
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username: username,
                plainpassword: password
                });
            navigate('/signin')
            alert("You have signed up!");
        } catch (err) {
            alert(`Error signing up, ${err}`);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded border min-w-48 p-8 rounded-xl">
                <InputComponent reference={usernameRef} placeholder={"Username"} />
                <InputComponent reference={passwordRef} placeholder={"Password"} />
                <div className="flex justify-center pt-4">
                    <Button onClick={signup} variant="primary" 
                    text="Signup" 
                    fullWidth={true}
                    loading={false}/>
                </div>
            </div>
        </div>
    )
}