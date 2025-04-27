import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent() {
    const [contents, setContents] = useState([]);

    async function getContents() {
        try{
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers : {
                    "Authorization": localStorage.getItem("token")
                }
            });
            //console.log(response.data.content);
            setContents(response.data.content);
        } catch (err) {
            console.log(`error fetching contents: ${err}`);
        }
    }

    useEffect(() => {
        getContents();
        let interval = setInterval(()=> {
            getContents()
        }, 10 * 1000);

        return () => { 
            clearInterval(interval);
        }
    }, [])

    return { contents, getContents}
}