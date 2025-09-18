import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Shake App</title>
        <meta name="description" content="Manage and create shakes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className="text-center flex flex-col items-center gap-6 p-6">
          <h1 className="text-4xl font-bold">Welcome to the Shake App 🥤</h1>
          <p className="text-lg text-gray-600">
            Create, view, and manage your favorite shakes
          </p>

          <Link
            href="/createshake"
            className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:bg-blue-700 transition"
          >
            Go to Create Page
          </Link>
          <Link
            href="/showshakes"
            className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:bg-blue-700 transition"
          >
            Go to Data Page
          </Link>
        </main>
      </div>
    </>
  );
}
