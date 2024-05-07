/* Imports. */
import { useState } from "react"
import { writeClient as client } from "./SanityClient"

/* Funksjon for å lage ny bruker. */
export default function CreateUser() {

    /* State for å mellomlagre den nye brukerens informasjon. */
    const [user, setUser] = useState({
        username: "",
        email: "",
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
        /* Se at alle felt har data. */
        if(user.username !== "" && user.email !== "" && user.password !== "") {
            /* Strukturen til det nye bruker objektet, med tilhørende data. */
            const newUser = {
                _type: 'bruker',
                username: user.username,
                email: user.email,
                password: user.password
            }
            
            /* 
            to-do, undersøke at det ikke finnes noen med samme brukernavn i systemet
            */
            
            /* Vi trenger bruker objektet sin ID for å legge til bruker arrayen senere. */
            let userID = ""
            /* Bruk vår skrive client for å lage en ny bruker. */
            await client.create(newUser).then((result) => {
                console.log(`User was created, document ID is ${result._id}`)
                userID = result._id
            })

            /* Vi forventer at det finnes bare en bruker array. Vi henter ID-en for den første (0) av dem. */
            /*
            const arrayID = await client.fetch('*[_type == "brukere"]')
            */
            
            /* Append den nye brukeren til den første (0) arrayen. */
            /*
            await client.patch(arrayID[0]._id)
            .setIfMissing({ list: [] })
            .append('list', [{ _type: 'reference', _ref: userID }])
            .commit({autoGenerateArrayKeys: true})
            */


            /* Fjern gammel data. */
            setUser({
                username: "",
                email: "",
                password: ""
            })

            /* Tøm form for data. */
            document.getElementById("newUserForm").reset()
        }
    }

    return (
    {/* Enkel HTML form for å teste at du kan lage ny bruker. */},
    <>
        <h1>Ny bruker ...</h1>
        <form id="newUserForm" onSubmit={handleSubmit}>
            <label htmlFor="username">Brukernavn </label>
            <input type="text" id="username" name="username" placeholder="kristine..." onChange={handleChange} required/>
            <label htmlFor="email">Epost </label>
            <input type="email" id="email" name="email" placeholder="kristine@gmail.com" onChange={handleChange} required/>
            <label htmlFor="email">Passord </label>
            <input type="password" id="password" name="password" placeholder="*********" onChange={handleChange} required/>
            <button type="submit" onClick={handleClick}>Lag bruker</button> 
        </form>
    </>
    )
}