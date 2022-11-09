import React from "react"

export default function Post(props) {
    return (
        <>
            <p>ID: {props.id}</p>
            <p>Erstellungsdatum: {props.creationTime}</p>
            <p>Titel: {props.title}</p>
            <p>Inhalt: {props.content}</p>
            <p>Ersteller: {props.user}</p>
            <p>Kommentare: {props.comments}</p>
            <p>Likes: {props.likes}</p>
            <p>Dislikes: {props.dislikes}</p>
        </>
    )
}