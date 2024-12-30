import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = ["Partners", "How-to", "HelpDesk", "Community"];

  return (
    <footer className="bg-black text-white flex flex-col md:flex-row justify-around p-6">
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
        <p>
          Smart Contract Address: 0x931D6873Cb0e5f6fAd2B6b80933BEF402dcB62b2
          (Verify on Sepolia Scan){" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
