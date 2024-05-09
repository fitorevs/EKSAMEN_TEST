import { authenticate } from "./AuthenticateUser"

export default function Redirect() {
    authenticate("/dashboard")
    return
}