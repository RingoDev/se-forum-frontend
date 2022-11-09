import React from "react"

export default function Comment(props) {
    return (
        <>
            <p>ID: {props.id}</p>
            <p>Erstellungsdatum: {props.creationTime}</p>
            <p>Inhalt: {props.content}</p>
            <p>Ersteller: {props.user}</p>
            <p>Post: {props.post}</p>
            <p>Kommentare: {props.comments}</p>
        </>
    )
}