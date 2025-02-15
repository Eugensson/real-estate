import Link from "next/link";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="py-6 mb-12 border-b">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-violet-900 transition-colors">
            Log in
          </Link>
          <Link
            href="#"
            className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};
