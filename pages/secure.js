import {useRouter} from 'next/router'
import { useEffect } from 'react'


export default function Secure() {
    const router = useRouter()

    const  SecureUser = async (data) => {
        if (data.ticket == undefined){
            console.log("data is undefined")
            return;
        }

        console.log("Securing user ")
        console.log(data)
        try {
            const res = await fetch("/api/secure", {
                method : "POST",
                headers : {
                    "Content-Type": "application/json; charset=utf8"
                },
                mode: "cors",
                cache: "no-cache",
                body: JSON.stringify(data)
            })
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        setTimeout(() => {
            console.log(router.query.ticket)
            SecureUser({ticket: router.query.ticket})
            // router.push("/")

        }, 0)
    }, [router.query.ticket])

    return (
        <>
            <h1>Securing your browser</h1>
            <p>Please wait a few seconds</p>
        </>
    )

}


