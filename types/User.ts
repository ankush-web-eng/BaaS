
export interface User {
    ID: string;
    Name: string;
    Email: string;
    APIKey: string;
    Requests: number;
    Cloudinary?: Cloudinary;
    Mail?: Mail;
}

export interface Cloudinary {
    ID: string;
    CloudName: string;
    APIKey: string;
    APISecret: string;
    Requests: number;
    UpdatedAt: Date;
    UserID: string;
}

export interface Mail {
    ID: string;
    Email: string;
    Password: string;
    Requests: number;
    UpdatedAt: Date;
    UserID: string;
}
