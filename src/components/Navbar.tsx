import Link from "next/link";
import AuthModal from "./AuthModal";

function Navbar(): JSX.Element {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link
        href="/dashboard"
        className="font-bold uppercase text-gray-700 text-2xl"
      >
        hum
      </Link>
      <div>
        <div className="flex">
          <AuthModal isSignIn={true} />
          <AuthModal isSignIn={false} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
