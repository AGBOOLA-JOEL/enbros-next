"use client";
import BlogFooter from "@/components/general/blog-footer";
import BlogNav from "@/components/general/blog-nav";
import BlogScroll from "@/components/general/blog-scroll";
import BlogToast from "@/components/general/blog-toast";
import ModalProvider from "@/providers/modal-provider";
import { usePathname } from "next/navigation";

const App = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define paths or path prefixes where footer should show
  const showNavPaths = ["/"];
  const showNavStartsWith = ["/post"];

  const shouldShowNav =
    showNavPaths.includes(pathname) ||
    showNavStartsWith.some((prefix) => pathname.startsWith(prefix));

  return (
    <body className="app">
      <BlogScroll />
      <BlogToast />
      <ModalProvider />
      {/* {shouldShowNav && ( */}
      <header className="app_navbar">
        <BlogNav />
      </header>
      {/* )} */}

      <main className="app_children">{children}</main>

      {shouldShowNav && (
        <footer className="app_footer">
          <BlogFooter />
        </footer>
      )}
    </body>
  );
};

export default App;
