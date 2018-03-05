export interface Post {
    title: String;
    content: String;
    createdAt?: number;
    updatedAt?: number;
    isAuth?: boolean;
    author?: object;
}
