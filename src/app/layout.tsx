import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "OpenWeather POC with T3 stack",
  description: "bootstrapped with create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            {/* <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 pb-16 pt-8"> */}
            <div className="flex-grow">
              <Header />
              {/* we don't want searchLocations here,
               because we don't want to preserve it's state between navigation.
               maybe use a template if needed. */}
              {/* <Template>{children}</Template> */}
              <main className="my-0 py-5">{children}</main>
            </div>
            <Footer />
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
