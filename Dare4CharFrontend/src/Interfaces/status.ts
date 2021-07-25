import { Item } from './post';

export interface Status {
    items: Item[];
    date: Date;
    userid: string;
}
