import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import connectDB from "./mongodb";
import User from "@/app/Sachema/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({
                    email: credentials.email
                });
                if (!user) {
                    throw new Error("User not found");
                }
                if (user.provider !== "email") {
                    throw new Error("Please login with Google");
                }
                const isMatch = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash
                );
                if (!isMatch) {
                    throw new Error("Incorrect Password");
                }
                return {
                    name: user.name,
                    email: user.email,
                    provider: user.provider
                };
            }
        }),
        GoogleProvider({

            clientId: process.env.GOOGLE_CLIENT_ID,

            clientSecret: process.env.GOOGLE_CLIENT_SECRET

        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                await connectDB();
                const existing = await User.findOne({
                    email: user.email
                });
                if (!existing) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        password: "",
                        provider: "google"
                    });
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.email;
                token.provider = user.provider;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.provider = token.provider;
            return session;
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};