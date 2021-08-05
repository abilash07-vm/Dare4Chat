import { Item } from './post';
import { User } from './user';

export interface Status {
    item: Item;
    date: Date;
    userid: string;
    views: number;
    viewsids: string[];
    statusid?:string
}

export interface StatusUser{
    user:User,
    statuses:Status[]
}