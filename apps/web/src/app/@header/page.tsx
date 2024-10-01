import Link from "next/link";
import React from "react";

export default function Page(): React.ReactNode {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      <h1 className="text-2xl font-bold text-white-800">
        <Link href="/" className="hover:text-white-100">
          User Profiles
        </Link>
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/users" className="hover:text-white-100">
              Users
            </Link>
          </li>
          <li>
            <Link href="/users/create" className="hover:text-white-100">
              Add
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
