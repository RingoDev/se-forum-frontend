import React from "react"
import {Link, useParams} from "react-router-dom";

export default function DetailedPost({posts}) {

    console.log("hey")

    const id = Number(useParams().id);

    console.log(posts)
    console.log(id)

    const post = posts.filter(p => p.id === id)[0]


    if(post === undefined){
        return <div>Post with id {id} was not found! <Link to={"/"}>Go Back</Link></div>
    }
    return (
        <>
            <p>ID: {post.id}</p>
            <p>Erstellungsdatum: {post.creationTime}</p>
            <p>Titel: {post.title}</p>
            <p>Inhalt: {post.content}</p>
            <p>Ersteller: {post.user}</p>
            <p>Kommentare: {post.comments}</p>
            <p>Likes: {post.likes}</p>
            <p>Dislikes: {post.dislikes}</p>
        </>
    )
}