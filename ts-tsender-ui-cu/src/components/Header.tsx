import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold">tsender</h1>
        <Link
          href="https://github.com/yourusername/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-3 py-1 rounded bg-white text-black hover:bg-gray-200 transition"
        >
          <FaGithub size={24} />
        </Link>
      </div>

      <div>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
