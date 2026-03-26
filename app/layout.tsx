import "./globals.css";
import 'katex/dist/katex.min.css';
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "NIBIT - All-in-One Student Management",
  description: "AI-powered learning, notes, finance, and health management for students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f1115] text-white antialiased min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-1 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </main>

      </body>
    </html>
  );
}
