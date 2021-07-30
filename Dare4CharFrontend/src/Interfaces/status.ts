import { Item } from './post';

export interface Status {
    item: Item;
    date: Date;
    userid: string;
    views: number;
    viewsids: string[];
    statusid?:string
}
