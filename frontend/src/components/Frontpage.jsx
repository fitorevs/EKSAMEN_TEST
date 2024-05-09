import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { readClient as client } from "./SanityClient"
import { authenticate } from "./AuthenticateUser"
import { FaAddressBook  } from "react-icons/fa6";
export default function Frontpage() {
    authenticate()

    const [user, setUser] = useState()
    
    /* Her henter vi all data om en bruker. */
    const fetchData = async () => {
        /* Lagre uuid verdien for lesbarhet. */
        const identificator = localStorage.getItem("identificator")
        /* Kjør spørring mot Sanity api. */
        const user = await client.fetch(`*[identificator == "${identificator}"]`)
        /* Fjern passordet fra dataen */
        delete user[0]["password"]
        /* Mellomlagre bruker dataen siden vi trenger å hente uuid verdiene til andre brukere i systemet. */
        let data = user[0]
        /* Legg til en array i data som skal holde de andre brukerene. */
        data["otherUsers"] = [] 
        /* Hent de andre brukerene. */
        let users = await client.fetch(`*[_type == "bruker"]`)
        /* Fjern oss selv fra dataen. */
        users = users.filter((thisUser) => thisUser.username !== data.username)
        /* Gå gjennom hver av de andre brukerene. Vi ønsker bare deres brukernavn og uuid verdi. */
        users.map(thisUser => {
            /* Legg til brukeren i otherUsers arrayen. */
            data.otherUsers.push(
                /* Dataen blir lagt til som et objekt. */
                {"username": thisUser.username,
                "identificator": thisUser.identificator}
            )
        })

        /* Først hent ID en til arrayen med filmer */
        const savedMoviesID = data.savedMovies[0]._ref
        /* Hent alle filmene fra brukeren sin array */
        const savedMoviesArray = (await client.fetch(`*[_id == "${savedMoviesID}"]`))[0].list

        /* Array for å lagre hver ID til de filmene vi ønsker å hente data for */
        let movieIdentificators = []

        /* Bygg ut data objektet med to objekter, en for filmer i wishlist og en for favoritt filmer */
        data["parsedWishlist"] = {"order":[]}
        data["parsedFavorites"] = {"order":[]}

        /* .map for å gå gjennom hver film. Vi skal først bygge opp movieIdentificators arrayen med alle ID ene, deretter bruke dem i en spørring. */
        savedMoviesArray.map((movie) => {
            /* Enkel sjekk for å avgjøre om en film er enten eller i wishlist eller favorit */
            const inWishlist = ("inWishlist" in movie ? true : false)
            const isFavorite = ("isFavorite" in movie ? true : false)

            /* Hent denne filmen sin ID */
            const movieIdentificator = movie.film._ref 
            /* Så legg denne ID en til arrayen */
            movieIdentificators.push(movieIdentificator)

            /* Hvis en film er i wishlist eller favorit legg til i parsed... objektet for den typen, både som objekt og ID en i order arrayen */
            if (inWishlist) {
                data.parsedWishlist.order.push(movieIdentificator)
                data.parsedWishlist[movieIdentificator] = {}
            }
            if (isFavorite) {
                data.parsedFavorites.order.push(movieIdentificator)
                data.parsedFavorites[movieIdentificator] = {}
            }

        })

        /* Gjør om denne arrayen med ID er til en string */
        movieIdentificators = JSON.stringify(movieIdentificators)

        /* Kjør en spørring hvor vi henter alle objekter med en git ID, altså filmene brukeren har i sin liste */
        const usersMovies = await client.fetch(`*[_id in ${movieIdentificators}]`)

        /* Her ønsker vi å koble filmene sine navn opp mot ID en. */
        usersMovies.map((movie) => {
            const movieID = movie._id
            /* Samme for wishlist og favoritt, bruk ID en for å legge til en ny attribut i det gite objektet */
            if (movieID in data.parsedWishlist) {
                data.parsedWishlist[movieID]["name"] = movie.name
            }
            if (movieID in data.parsedFavorites) {
                data.parsedFavorites[movieID]["name"] = movie.name
            }
        })
        
        /* 
            to-do: bygge ut her for å hente annen relevant data vi legger til i Sanity senere, for film objekter, slik som cover, sjanger og lignende 
            kan bare gjøre det hvor vi legger til navnet i parsed... objektet
        */

        /* Oppdater state vi har med bruker data. */
        setUser(data)

        /* Data-strukturen til user state:
            -
            user[0].parsedWishlist og user[0].parsedFavorites
            Filmer som objekter med nøkkel etter deres ID med navn og andre verdier.
            .order er en array for begge for å enkelt parse dem.
            Dette er litt messy, men det brukes et sånt "to-front" angrep for å koble navnet til en gitt film opp mot sin id.
            -
            user[0].otherUsers
            array med objekter av alle brukere
            .username og .identificator
            er attributene, siden disse er de eneste verdiene vi behøver

        */
    }
    
    /* Bruker useEffect her for å sørge for at alt har lastet. */
    useEffect(() => {
        if(user === undefined) {
            fetchData()
        }
    })

    return(
        <>
            <h2>Hei {user?.username}</h2>
            <section>
                <p>Filmer jeg skal se!</p>
            </section>
            <section>
                <p>Disse filmene ligger i ønskelisten din:</p>
            </section>
            <section>
                Jeg skal se sammen med...
                {user?.otherUsers.map((thisUser, index) =>
                    <Link key={`user${index}`} to={`/dashboard/${thisUser.identificator}`}>
                        <p>{thisUser.username}</p>
                    </Link>
                )}
            </section>
        </>
    )
}