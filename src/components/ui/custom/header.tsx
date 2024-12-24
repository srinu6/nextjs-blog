import { LogoutAction } from "@/app/login/action";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center py-4 px-6 bg-gradient-to-r from-indigo-200 to-emerald-200">
      <div className="flex flex-row gap-4 items-center justify-start">
        <Link href={"/"} className="inline-block font-semibold text-2xl">
          Blogger
        </Link>
        <Link href={"/blog/new"}>Write Blog</Link>
      </div>
      <form action={LogoutAction}>
        <button
          type="submit"
          className="bg-white text-black rounded-2xl py-0.5 px-4 text-sm hover:bg-black hover:text-white transition-all duration-300 ease-out"
        >
          Logout
        </button>
      </form>
    </header>
  );
}