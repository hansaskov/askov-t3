// components/common/MainLayout.tsx
import React, { PropsWithChildren } from "react";
import { Navbar } from "./navbar";
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default MainLayout;