import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Script from 'next/script'

export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
    return (
        <>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></Script>
        <SessionProvider session={session} >
            <Component {...pageProps} />
        </SessionProvider>
        </>
    )
}
