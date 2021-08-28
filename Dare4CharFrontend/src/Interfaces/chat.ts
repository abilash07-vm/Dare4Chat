export interface Message {
    from: string,
    to: string,
    message: string,
    messageid:string,
    date:Date,
    type:string,
    isRead: boolean
}

export interface DateMessage {
    date:Date,
    messages:Message[]
}


