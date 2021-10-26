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

    const handleSubmit = event => {
        event.preventDefault()

        const userToCreate = {
            userName,
            email
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToCreate)
        }

        fetch("https://localhost:3030/users", fetchOptions)
            .then(res => res.json())
            .then(newUser => {

                const profileToCreate = {
                    firstName,
                    lastName,
                    userId: newUser.id
                }
                const fetchTools = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(profileToCreate)
                }

                fetch("https://localhost:3030/users", fetchTools)
                    .then((res) => res.json())
                    .then((newProfile) => {

                        const userToAdd = {
                            ...newUser,
                            profile: newProfile
                        }

                        setUsers([...users, userToAdd])
                    })
            }), []
    }


    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleUserName} />
            <input onChange={handleEmail} />
            <input onChange={handleFirstName} />
            <input onChange={handleLastName} />
        </form>

    )
}