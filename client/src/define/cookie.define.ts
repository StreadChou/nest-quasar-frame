export enum CookieKey {
    User = "user",
}


export interface CookieUserInterface {
    id: string,
    access_token: string;
    email: string;
    super: boolean;
    username: string;
}
