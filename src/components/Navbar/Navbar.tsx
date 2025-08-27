import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.png";

// type NavbarProps = {
//   name: string
// }

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-1 ">
      <Link href="/" className="flex items-center justify-center h-20">
        <Image src={Logo} alt="Logo" width={350} />
      </Link>
      <div className="flex items-center">
        <button className="bg-[#FF9916] text-white px-2 py-1 sm:px-4 rounded-b-md text-sm font-medium hover:text-[#FF9916] hover:bg-white hover:border-2 hover:border-[#FF9916] border-2 border-transparent transition duration-300 ease-in-out">
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
