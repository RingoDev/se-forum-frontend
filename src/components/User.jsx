import React from "react"

export default function User(props) {
    return (
        <>
            <p>ID: {props.id}</p>
            <p>Benutzername: {props.username}</p>
        </>
    )
}