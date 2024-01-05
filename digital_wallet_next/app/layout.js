import "./globals.css";
import Nav from "./(components)/Nav";

export const metadata = {};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div>{children}</div>
      </body>
    </html>
  );
}
