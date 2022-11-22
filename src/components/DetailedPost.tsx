import { Link, useParams } from "react-router-dom";
import { PostT } from "../types";
import Comment from "./Comment";

interface Props {
  posts: PostT[];
}

export default function DetailedPost({ posts }: Props) {
  const id = Number(useParams().id);

  const post = posts.filter((p) => p.id === id)[0];

  if (post === undefined) {
    return (
      <div>
        Post with id {id} was not found! <Link to={"/"}>Go Back</Link>
      </div>
    );
  }
  return (
    <div className={"max-w-2xl p-12 mx-auto"}>
      <h1 className={"text-2xl text-center mb-4"}>{post.title}</h1>
      <div className={"text-end mb-8"}>
        erstellt von: {post.user.username} am {post.creationTime}
      </div>

      <div>{post.content}</div>
      <p>Likes: {post.likes.length}</p>

      {post.comments.map((c) => (
        <div key={c.id}>
          <Comment comment={c} />
        </div>
      ))}
    </div>
  );
}
