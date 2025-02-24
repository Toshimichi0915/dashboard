import "@/styles/global.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { Ubuntu } from "next/font/google"

const ubuntu = Ubuntu({ subsets: ["latin"], weight: "400" })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={ubuntu.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
