import { Injectable } from '@angular/core';

const USER_ID_KEY = 'user-id';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}
    // Common Local storage methods
    setToStorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    getFromStorage(key: string) {
        return localStorage.getItem(key);
    }

    // user id
    getUserId() {
        return this.getFromStorage(USER_ID_KEY);
    }
    setUserId(id: string) {
        this.setToStorage(USER_ID_KEY, id);
    }
}
