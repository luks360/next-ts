import NextAuth from "next-auth";
import axios from 'axios'
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import InstagramProvider from "next-auth/providers/instagram"
import CredentialsProvider from "next-auth/providers/credentials";

const getUser = async () => {
    return await axios.get("http://localhost:8000/api/user")
};

async function addUser(session) {

    const {data} = await getUser()
    var e = 0
    if(data != undefined){
        const users = data.map(user => {
            return {
                email: user.email,
            }
        })

        for (var i = 0; i < users.length; i++) {
            if (users[i].email == session.token.email) {
                e = 1
                break
            }
        }
    }
    if (e == 0) {
        const u = {"name": session.token.name, "email": session.token.email }
        axios.post("http://localhost:8000/api/user", u)
    }
}

export default NextAuth({
    // Configurar um ou mais provedores de autenticação
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: {
                label: "Email",
                type: "email",
                placeholder: "Email: exemplo@exemplo.com",
              },
              password: { label: "Senha", type: "password" },
            },
            async authorize(credentials, req) {
                const res = await authenticate(credentials); // custom function that returns an object with a jwt if auth is successful
        
                if(res.status !== 200) {
                  return null;
                }
        
                return res.user;
              }
          }),
    ],

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
              token.id = user.id;
            }
      
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
              session.id = token.id;
            }
            return session;
        },
    },
});