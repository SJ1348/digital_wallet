import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-red-400 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div className="flex gap-10">
          <Link href="/">Home</Link>

          {!session ? <Link href="/signup">Sign Up</Link> : <></>}
          {session ? (
            <div className="flex gap-10">
              <Link href="/wallet">Wallet</Link>
              <Link href="/transactionHistory">Transaction History</Link>
              <Link href="/bankBalance">View Bank Balance</Link>
              <Link href="/userProfile">User Profile</Link>
              <Link href="/addAccount">Add Account</Link>
              <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            </div>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
