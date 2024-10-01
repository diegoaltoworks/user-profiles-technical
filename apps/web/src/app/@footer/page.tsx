import Link from "next/link";
import React from "react";

export default function Page(): React.ReactNode {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <Link href="https://diegoalto.works/">DWorks</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
