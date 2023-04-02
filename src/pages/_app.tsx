import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "askov/utils/api";

import "@total-typescript/ts-reset";
import "askov/styles/globals.css";
import MainLayout from "askov/components/layout/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MainLayout >
        <Component {...pageProps} />
      </MainLayout>

    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
