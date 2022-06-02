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

      <div className="text-gray-700 ">
        <div>
          <header>
            <nav className="px-7 text-lg font-bold">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-300 ">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {/* <img
                      className="h-8 w-8"
                      src="m1.png"
                      alt="Workflow"
                    /> */}
                    </div>
                    <div className="block">
                      <div className="ml-10 flex items-baseline space-x-4 uppercase">
                        Stripe Press
                      
                      </div>
                    </div>
                  </div>
                  <div className="block">
                  <div className="ml-10 flex items-baseline space-x-4 uppercase">
                     <Link href="/">
                        <div className="cursor-pointer  hover:underline hover:text-gray-900 px-3 py-2 ">
                          Books
                        </div>
                      </Link>
                      <Link href="/#">
                        <div className="cursor-pointer  hover:underline hover:text-gray-900 px-3 py-2  ">
                          Link
                        </div>
                      </Link>
                      </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
        <div className="my-6  max-w-7xl mx-auto text-gray-700">
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
