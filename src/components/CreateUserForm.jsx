import { useState } from "react"

export default function CreateUserForm() {
    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [profiles, setProfiles] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleUserName = event => {
        event.preventDefault()

        setUserName(event.target.vaule)
    }

    const handleEmail = event => {
        event.preventDefault()

        setEmail(event.target.vaule)
    }

    const handleFirstName = event => {
        event.preventDefault()

        setFirstName(event.target.vaule)
    }

    const handleLastName = event => {
        event.preventDefault()

        setLastName(event.target.vaule)
    }


    return (
        <form>
            <input onChange={handleUserName} />
            <input onChange={handleEmail} />
            <input onChange={handleFirstName} />
            <input onChange={handleLastName} />
        </form>

    )
}