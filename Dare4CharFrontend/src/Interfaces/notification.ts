export interface Notification {
    notificationid:string,
    userid:string,
    message?:string,
    type:string,
    date:Date
    read:boolean,
    postid?:string
}
