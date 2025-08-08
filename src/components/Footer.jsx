import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black/80 text-center z-10 mt-auto">
      <p className="py-3 px-4 text-white text-xs">
        &copy; {new Date().getFullYear()} Design by Nhi Y Nguyen. All rights
        reserved
      </p>
    </footer>
  );
};

export default Footer;
