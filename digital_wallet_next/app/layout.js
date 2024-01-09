import "./globals.css";
import Nav from "./(components)/Nav";
import AuthProvider from "./(components)/AuthProvider";

export const metadata = {};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <AuthProvider>
          <div>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
