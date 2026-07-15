import React from "react";
import Image from "next/image";
import Link from "next/link";

const languages = [
  {
    src: "/Python-logo.png",
    alt: "Python",
    name: "Python",
    link: "https://docs.python.org/3/",
  },
  {
    src: "/java-coffee-cup-logo.png",
    alt: "Java",
    name: "Java",
    link: "https://docs.oracle.com/en/java/",
  },
  {
    src: "/sql.png",
    alt: "SQL",
    name: "SQL",
    link: "https://www.postgresql.org/docs/",
  },
  {
    src: "/javascript-logo.png",
    alt: "JavaScript",
    name: "JavaScript",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    src: "/c+++.png",
    alt: "C++",
    name: "C++",
    link: "https://en.cppreference.com/w/",
  },
  {
    src: "/rust1.png",
    alt: "Rust",
    name: "Rust",
    link: "https://doc.rust-lang.org/book/",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-bg pt-20 pb-20 px-6">
      <h1 className="text-text text-3xl font-bold text-center mb-16">
        Explore the Languages
      </h1>

      <div className="grid grid-cols-3 gap-x-16 gap-y-16 justify-center items-center align-middle max-w-4xl mx-auto">
        {languages.map((lang) => (
          <Link
            key={lang.name}
            href={lang.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-surface hover:scale-105 transition-all"
          >
            <Image src={lang.src} alt={lang.alt} width={150} height={150} />
            <span className="text-text">
              <b>{lang.name}</b>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;