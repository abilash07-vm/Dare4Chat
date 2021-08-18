export interface User {
    userid:string,
    emailid:string,
    profileurl?:string,
    username:string,
    postids:string[],
    friendsids:string[],
    isOnline:boolean,
    lastseen:Date,
    isPro:boolean,
    bio:string,
    category:string,
    lastMessage?:string

}
export interface UserCredientials{
    emailid:string,
    admin:boolean,
    password:string
}

export interface RequestSent{
    userid:string,
    sentids:string[]
}

export interface RequestRecieved{
    userid:string,
    receivedids:string[]
}
