export interface PostT {
  id: string;
  creationTime: string;
  title: string;
  content: string;
  user: UserT;
  comments: CommentT[];
  likes: Like[];
  dislikes: Dislike[];
}

export type CommentT = DetailedCommentT;

export interface DetailedCommentT {
  id: string;
  creationTime: string;
  content: string;
  post: string;
  user: UserT;
  subcomments: DetailedCommentT[];
}

export interface CommentDtoT {
  content: string;
  user: string;
  subcomments: CommentDtoT[];
}

export interface UserT {
  id: string;
  username: string;
}

export interface Like {
  id: string;
  creationTime: string;
  user: UserT;
  post: string;
}

export interface Dislike {
  id: string;
  creationTime: string;
  user: UserT;
  post: string;
}
