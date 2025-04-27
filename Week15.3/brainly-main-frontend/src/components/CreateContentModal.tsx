import { useRef, useState } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { InputComponent } from "./Input"
import axios from "axios"
import { BACKEND_URL } from "../config"

enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter"
}

// controlled compo
export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const token = localStorage.getItem("token");

        try{
            await axios.post(`${BACKEND_URL}/api/v1/content`,{
                title: title,
                link: link,
                type: type
            }, {
                headers :{
                    "Authorization": token
                }
            });
            onClose();
            
        } catch (err) {
            alert("could not add content");
        }

    }
    
    return (
        <div>
            {open && 
            <div>
                <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 opacity-60 flex justify-center">
                </div>

                <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                    <div className="flex flex-col justify-center ">
                        <span className="bg-white opacity-100 rounded-md p-4">
                            <div className="flex justify-end">
                                <div onClick={onClose}>
                                    <CrossIcon />
                                </div>
                            </div>
                            <div>
                                <InputComponent reference={titleRef} placeholder={"title"}/>
                                <InputComponent reference={linkRef} placeholder={"link"}/>
                            </div>
                            <div>
                                <div className="flex justify-center">
                                    <h1>Type</h1>
                                </div>
                                <div className="flex gap-1 p-4">
                                    <Button onClick={() => {setType(ContentType.Youtube)}} text="Youtube" variant={type === ContentType.Youtube? "primary" : "secondary"} />
                                    <Button onClick={() => {setType(ContentType.Twitter)}} text="Twitter" variant={type === ContentType.Twitter? "primary" : "secondary"} />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Button onClick={addContent} variant={"primary"} text={"submit"}/>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            
            }
        </div>
    )

}

