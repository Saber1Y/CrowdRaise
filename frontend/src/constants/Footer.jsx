import React from "react";
import Copy from "./Copy";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = ["Partners", "How-to", "HelpDesk", "Community"];

  return (
    <footer className="bg-black text-white flex flex-col md:flex-row justify-between p-6">
      {/* Links section */}
      {Array(2)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="font-bold text-2xl mb-4 ">Quick Links</h3>
            <ul>
              {links.map((link, i) => (
                <li key={i} className="mb-2 hover:underline cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}

      <div className="flex flex-col space-y-5">
        <h3 className="font-bold text-2xl mb-4">Our Office</h3>
        <address className="not-italic">
          Jalan Rambu Raya Timur No. 18,
          <br /> Kota Administrasi, Jakarta Pusat.
          <br />
          ZIP: 10000
        </address>

        <p className="text-sm">
          &copy; {currentYear} Kita Bangun Digital Platform. All rights
          reserved.
        </p>
        <div className="text-md truncate">
          <span>
            Smart Contract Address:0xf6920D45d16c5FAa9eB40753Bb3F16D353355705
            (Verify on Sepolia Scan){" "}
          </span>
          <Copy
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-4 md:ml-1 m-0 cursor-pointer"
              >
                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
              </svg>
            }
            text="0xf6920D45d16c5FAa9eB40753Bb3F16D353355705"
          />
        </div>
        <div className="text-md truncate">
          <span>
            Confirm By
            Hash:0x051813873a6e3c0fbb983e0e245e94b9b8e0aa7395c1a16ed603c8219b78b5bf
            (Verify on Sepolia Scan){" "}
          </span>
          <Copy
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-4 md:ml-1 m-0 cursor-pointer"
              >
                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
              </svg>
            }
            text="0x051813873a6e3c0fbb983e0e245e94b9b8e0aa7395c1a16ed603c8219b78b5bf"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
