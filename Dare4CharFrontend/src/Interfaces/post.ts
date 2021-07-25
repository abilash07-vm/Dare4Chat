export interface Post {
    items: Item[];
    date: Date;
    userid: string;
    likes: number;
    comments: Comment[];
}
export interface Item {
    url: string;
    caption: string;
}
export interface Comment {
    date: Date;
    userid: string;
    message: string;
    likes: string;
}
