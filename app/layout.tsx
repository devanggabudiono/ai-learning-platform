import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">

        <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">

          <h1 className="text-xl font-bold">
            AI Learning
          </h1>

          <div className="flex gap-6 text-gray-300">
            <Link href="/">Home</Link>
            <Link href="/learn">Learn</Link>
            <Link href="/ai-tutor">AI Tutor</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
          </div>

        </nav>

        <main className="px-10 py-10">
          {children}
        </main>

      </body>
    </html>
  );
}
