
export interface User {
    id: string;
    name: string;
    email: string;
    apikey: string;
    requests: number;
    cloudinary: Cloudinary | undefined;
    mail: Mail | undefined;
}

export interface Cloudinary {
    id: string;
    cloudName: string;
    apiKey: string;
    apiSecret: string;
    requests: number;
    updatedAt: Date;
    userId: string;
}

export interface Mail {
    id: string;
    email: string;
    password: string;
    requests: number;
    updatedAt: Date;
    userId: string;
}
