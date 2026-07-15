import React from "react";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-accent/20 px-4 sm:px-8 py-4 mt-auto">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="font-bold text-lg sm:text-xl text-accentSoft">
          Code Compass
        </h2>

        <p className="text-sm text-text text-center">
          © 2026 Code Compass. All Rights Reserved.
        </p>

        <p className="text-xs text-muted text-center">
          AI Tech Stack Recommendation Platform
        </p>
      </div>
    </footer>
  );
};

export default Footer;