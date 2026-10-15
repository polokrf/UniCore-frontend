import Footer from "@/components/layout/pubilc/Footer";
import Header from "@/components/layout/pubilc/Header";

export default function PublicLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className=" relative flex flex-col min-h-screen">
      <header className=" sticky top-0  z-100 ">
        <Header />
      </header>
      <main className=" flex-1  lg:px-5 px-2 ">{children}</main>
      <Footer />
    </div>
  );
}
