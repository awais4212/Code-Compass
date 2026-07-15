import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-surface border-b border-accent/20 px-4 sm:px-8 py-4 relative">
      {/* Checkbox now lives directly under <nav>, sibling to the mobile ul below */}
      <input type="checkbox" id="nav-toggle" className="peer hidden" />

      <div className="flex items-center justify-between">
        <span className="font-bold text-lg sm:text-xl text-accentSoft">
          <Link href="/">Code Compass</Link>
        </span>

        <label
          htmlFor="nav-toggle"
          className="sm:hidden text-text text-2xl cursor-pointer select-none"
        >
          ☰
        </label>

        <ul className="hidden sm:flex gap-10 font-semibold text-text">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Languages" className="hover:text-accent transition-colors">
              Languages
            </Link>
          </li>
          <li>
            <Link href="/About" className="hover:text-accent transition-colors">
              About
            </Link>
          </li>
        </ul>
      </div>

      {/* Now a true sibling of the checkbox — peer-checked will work */}
      <ul className="hidden peer-checked:flex flex-col gap-4 mt-4 sm:hidden font-semibold text-text">
        <li>
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/Languages" className="hover:text-accent transition-colors">
            Languages
          </Link>
        </li>
        <li>
          <Link href="/About" className="hover:text-accent transition-colors">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;