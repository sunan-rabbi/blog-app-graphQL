export interface IPost {
    title: string;
    content: string;
}
export interface IUpdatePost {
    postId: string;
    title: string;
    content: string;
}
export interface IDeletePost {
    postId: string;
}