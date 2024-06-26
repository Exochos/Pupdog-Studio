"use client";

// app/maths/week1/page.tsx

import React from "react";

const Week1Page: React.FC = () => {
  const calculate = () => {
    const inputNumber = document.getElementById("inputNumber") as HTMLInputElement;
    const base = document.getElementById("base") as HTMLInputElement;
    const outputNumber = document.getElementById("outputNumber") as HTMLInputElement;

    if (!inputNumber || !base || !outputNumber) {
      return;
    }

    const input = parseInt(inputNumber.value);
    const newBase = parseInt(base.value);

    if (isNaN(input) || isNaN(newBase)) {
      outputNumber.value = "Invalid input";
      return;
    }

    if (newBase < 2 || newBase > 36) {
      outputNumber.value = "Base must be between 2 and 36";
      return;
    }

    outputNumber.value = input.toString(newBase);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Week 1 Maths Assignment 1<br /> Multi-Base Numerical Converter</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Input Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              id="inputNumber"
              type="text"
              placeholder="Enter your number in base 10"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Base:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="base"
              type="text"
              placeholder="Enter the base you want to convert to"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Output Number:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="outputNumber"
              placeholder="Your number in the new base"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" onClick={calculate}
                
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Week1Page;
