"use client";
import BlogFooter from "@/components/general/blog-footer";
import BlogNav from "@/components/general/blog-nav";
import BlogToast from "@/components/general/blog-toast";
import ModalProvider from "@/providers/modal-provider";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="app">
      <BlogToast />
      <ModalProvider />

      <header className="app_navbar">
        <BlogNav />
      </header>

      <main className="app_children">{children}</main>

      <footer className="app_footer">
        <BlogFooter />
      </footer>
    </body>
  );
};

export default App;
