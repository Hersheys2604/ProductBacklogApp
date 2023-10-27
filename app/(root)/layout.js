import "../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });
import { getServerSession } from "next-auth"; //https://www.youtube.com/watch?v=PrdbyNYq-z4
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

export const metadata = {
  title: "Prolog",
  description: "FIT2101 Project",
};

export default async function RootLayout({ children }) {
  let showPage = true;
  let isAdmin = false;
  const session = await getServerSession(authOptions);
  if (session) {
    showPage = true;
    if (session.user.role == "ADMIN") {
      isAdmin = true;
    }
  } else {
    showPage = false;
  }
  return (
    <html lang="en">
      <body
        style={{ height: "100%", width: "100%" }}
        className={inter.className}
      >
        <Navigation isAdmin={isAdmin} />
        <main className="main_content">
          {showPage && children}
          {!showPage && (
            <>
              <h2>Not signed in! Either reload or go back to login</h2>
              <Link href="/login">Return to login page</Link>
            </>
          )}
        </main>
      </body>
    </html>
  );
}
