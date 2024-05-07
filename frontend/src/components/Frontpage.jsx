import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Frontpage() {
    const navigate = useNavigate()

    const authenticated = localStorage.getItem("authenticated")

    useEffect(() => {
        if (authenticated === "true") {
            navigate("/dashboard")
        } else {
            navigate("/login")
        }
    })
    return
}