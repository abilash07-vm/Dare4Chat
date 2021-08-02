export interface User {
    userid:string,
    emailid:string,
    profileurl?:string,
    username:string,
    postids:string[],
    friendsids:string[],

}
export interface UserCredientials{
    emailid:string,
    admin:boolean,
    password:string
}
