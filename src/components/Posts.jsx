import React from "react"
import {Link} from "react-router-dom";

export default function Posts({posts}) {
    return (
        <>
            {posts.map(p => (
                <div key={p.id}>
                    <p><Link to={"/" + p.id}>ID: {p.id}</Link></p>
                    <p>Erstellungsdatum: {p.creationTime}</p>
                    <p>Titel: {p.title}</p>
                    <p>Inhalt: {p.content}</p>
                    <p>Ersteller: {p.user}</p>
                    <p>Kommentare: {p.comments}</p>
                    <p>Likes: {p.likes}</p>
                    <p>Dislikes: {p.dislikes}</p>
                </div>
            ))}

        </>
    )
}