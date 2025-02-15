import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl font-semibold flex items-baseline gap-0.5"
    >
      HomeLand <div className="size-2 bg-secondary rounded-full" />
    </Link>
  );
};
