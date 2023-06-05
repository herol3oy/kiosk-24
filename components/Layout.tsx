import { PropsWithChildren } from "react";
import TopBar from "./TopBar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-10 my-5">
      <TopBar />
      {children}
    </main>
  );
};

export default Layout;
