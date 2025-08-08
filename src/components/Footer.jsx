import React from "react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-black/80 text-center z-20">
      <p className="py-3 px-4 text-white text-xs">
        &copy; {new Date().getFullYear()} Design by Nhi Y Nguyen. All rights
        reserved
      </p>
    </footer>
  );
};

export default Footer;
