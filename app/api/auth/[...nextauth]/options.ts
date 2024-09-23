import axios, { AxiosError } from 'axios';
import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
// import { User } from '@/types/User';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                identifier: { label: "Email", type: 'text' },
                password: { label: "Password", type: 'password' }
            },
            async authorize(credentials) {
                try {
                    const email = credentials?.identifier;
                    const password = credentials?.password;
                    if (email && password) {
                        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signin`, { email, password });
                        if (response.status !== 200) {
                            throw new Error(response.data);
                        } else {
                            const user = response.data;
                            return user;
                        }
                    }
                    else {
                        throw new Error('Credentials are required!!!');
                    }
                } catch (err) {
                    const axiosError = err as AxiosError<string>
                    console.log("respponse data: ", axiosError.response?.data);
                    throw new Error(axiosError.response?.data);
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                if (account.provider === 'google') {
                    const existingUser = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signin/verify`, { email: user.email });

                    if (existingUser.status !== 200) {
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, { email: user.email, name: user.name, password: '••••••••', isVerified: true });
                    }

                }

                token.Email = user.Email;
            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            if (token) {
                if (session.user) {
                    session.user.email = token.Email as string;
                }
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: '/signin',
    },
}