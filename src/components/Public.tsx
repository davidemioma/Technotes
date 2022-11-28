import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="pt-5 flex flex-col w-full h-full">
      <header className="flex items-center justify-between border-b-2 border-white px-5 mb-3">
        <h1 className="text-2xl font-semibold pb-5 ">
          Welcome to <span className="">Dan D. Repairs!</span>
        </h1>

        <Link to="/login">
          <div className="bg-white text-black px-3 py-1 rounded cursor-pointer hover:scale-105 transition-transform duration-200">
            Login
          </div>
        </Link>
      </header>

      <main className="px-5 flex-1">
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>

        <br />

        <address className="">
          Dan D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>

        <br />

        <p>Owner: Dan Davidson</p>
      </main>
    </section>
  );
};

export default Public;
