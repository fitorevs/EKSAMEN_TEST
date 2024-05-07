/* Imports. */
import { useState } from "react"
import { readClient as client } from "./SanityClient"

export default function LoginUser() {

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    /* Funksjon som kjører hvis formen forsøkes å bli submitted, altså ungå at den blir tømt om vi ikke ønsker det. */
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    /* Hente data fra en gitt input felt og oppdater dataen i user state utifra hvilken det er. */
    const handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        setUser((data) => ({...data, [inputName]: inputValue}))
    }

    /* Hvis alle felt har data, bruk denne funksjonen for å lage en ny bruker. */
    const handleClick = async () => {
        if(user.username !== "" && user.password !== "") {
            const users = await client.fetch('*[_type == "bruker"]')
            
            const userSearch = users.find((thisUser) => thisUser.username == user.username && thisUser.password == user.password)
            
            if (userSearch !== "undefined") {
                localStorage.setItem("authenticated", true);
            }

            document.getElementById("loginUserForm").reset()
        }
    }

    return (
        {/* Enkel HTML form for å teste at du kan lage ny bruker. */},
        <>
            <h1>Login bruker ...</h1>
            <form id="loginUserForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Brukernavn </label>
                <input type="text" id="username" name="username" placeholder="kristine..." onChange={handleChange} required/>
                <label htmlFor="email">Passord </label>
                <input type="password" id="password" name="password" placeholder="*********" onChange={handleChange} required/>
                <button type="submit" onClick={handleClick}>Login bruker</button> 
            </form>
        </>
        )
}