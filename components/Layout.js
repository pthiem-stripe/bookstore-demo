import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Stripe Press</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-gray-700 font-sans ">
        <div>
          <header>
            <nav className="px-7 text-lg font-bold">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-300 ">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-12" src="press.png" alt="Workflow" />
                    </div>
                    <div className="block">
                      <Link href="/">
                        <div className="ml-4 flex items-baseline space-x-4 uppercase cursor-pointer  hover:underline hover:text-gray-900 px-3 py-2 ">
                          Stripe Press
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="block">
                    <div className="ml-10 flex items-baseline space-x-4 uppercase">
                      <Link href="/">
                        <div className="cursor-pointer  hover:underline hover:text-gray-900 px-3 py-2 ">
                          Books
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
        <div className="my-6  max-w-7xl mx-auto text-gray-700 text-sm">
          <main className="flex flex-col items-center justify-center ">
            <div className="w-full items-center flex flex-col mb-20  ">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
