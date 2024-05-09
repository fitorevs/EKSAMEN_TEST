/* Imports. */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isUUID } from "validator"

/* Funksjon for å avgjøre at brukeren er logget in, og at vi har en gyldig uuid verdi for dem. Goto er et argument hvilket kan gis for å gå til en gitt side hvis vi er logget inn. */
export const authenticate = (goto = "") => {
    /* Lage instans av useNavigate. */
    const navigate = useNavigate()

    /* Hent booleanen for authenticated fra localStorage. */
    const authenticated = localStorage.getItem("authenticated")

    /* Midlertidig variable for å "huske" om vi har funnet ut at brukeren har en uuid verdi. */
    let hasIdentificator = false

    /* Hvis dette er null har vi ingen uuid verdi i localStorage. */
    if (localStorage.getItem("identificator") !== null) {

        /* Lagre uuid verdien i en variable for lesbarhet. */
        const identificator = localStorage.getItem("identificator")
        /* Kjør funksjonen isUUID for å validere. */
        if (isUUID(identificator) === true) {
            /* Brukeren har gyldig uuid verdi. */
            hasIdentificator = true
        }

    }

    /* Funksjon for å håndtere selv navigasjonen. */
    useEffect(() => {
        /* Hvis brukeren er logget in og har uuid verdi. */
        if (authenticated === "true" && hasIdentificator === true) {
            /* Har vi git goto en verdi går vi ditt. */
            if(goto !== "") {
                navigate(`/${goto}`)
            }
        /* Hvis brukeren ikke er logget in, send dem til /login siden. */
        } else {
            navigate("/login")
        }
    })
}