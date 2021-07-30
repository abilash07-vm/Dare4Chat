import { Item } from './post';

export interface Status {
    item: Item;
    date: Date;
    userid: string;
    views: number;
    statusid?:string
}
