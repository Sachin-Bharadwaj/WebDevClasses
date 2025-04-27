import { Button } from "../components/Button";
import { InputComponent } from "../components/Input";
import axios from 'axios'
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        

        try{
            console.log(`${BACKEND_URL}/api/v1/signin`)
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username: username,
                plainpassword: password
                });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            // redirect user to the dashboard
            navigate("/dashboard");
            
        } catch (err) {
            alert(`Error signing in, ${err}`);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded border min-w-48 p-8 rounded-xl">
                <InputComponent reference={usernameRef} placeholder={"Username"} />
                <InputComponent reference={passwordRef} placeholder={"Password"} />
                <div className="flex justify-center pt-4">
                    <Button onClick={signin} variant="primary" 
                    text="Signin" 
                    fullWidth={true}
                    loading={false}/>
                </div>
            </div>
        </div>
    )
}