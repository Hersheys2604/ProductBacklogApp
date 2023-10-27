import "../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prolog",
  description: "FIT2101 Project",
};

export default function LandingLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{ height: "100%", width: "100%" }}
        className={inter.className}
        alt="background pic of shapes"
      >
        {children}
      </body>
    </html>
  );
}
