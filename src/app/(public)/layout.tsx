import Footer from "@/components/layout/pubilc/Footer";
import Header from "@/components/layout/pubilc/Header";

export default function PublicLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className=" flex flex-col min-h-screen">
      <Header />
      <main className=" flex-1  lg:px-5 px-2 lg:py-6 py-4">
        {children}</main>
      <Footer />
    </div>
  );
}
