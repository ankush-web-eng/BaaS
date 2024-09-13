import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            ID?: string;
            Name?: string;
            Email?: string;
        } & DefaultSession['user'];
    }

    interface User {
        ID?: string;
        Name?: string;
        Email?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        ID?: string;
        Name?: string;
        Email?: string;
    }
}