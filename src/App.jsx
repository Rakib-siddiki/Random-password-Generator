import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);

  // for generate random Password
  const PasswordGenretor = useCallback(() => {
    let pass = "";
    let str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;

    if (symbol)
      str += `!@#$%^&*()-_+=[]{}|;:'"<>,./?`

    if (number) str += "0123456789";

    for (let i = 1; i <= length; i++) {
      let randomPass = Math.floor(Math.random() * str.length); // create random password generator function
      // console.log(randomPass);
      pass += str.charAt(randomPass); // here i append the characters in pass variable 
      // console.log(pass);
    }
    setPassword(pass);
  }, [length, number, symbol, setPassword]);

  const generatePassword = () => {
    PasswordGenretor();
  };
  useEffect(()=>{
    PasswordGenretor()
  },[length,number,symbol,PasswordGenretor])
  // UseRef hook used for take refrance from your value
  const passwordRef = useRef(null)

  const copyPass = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  
  return (
    <>
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 pt-4 pb-10 my-8 bg-gray-800 text-black">
          <h1 className="text-white text-center w-full font-bold text-3xl mt-5">
            Password Generator
          </h1>
          <div className="flex justify-center mt-5">
            <input
              className="w-full max-w-md py-3 px-3 rounded-l-md outline-none"
              type="text"
              value={password}
              readOnly
              placeholder="Password"
              ref={passwordRef}
            />
            <button
              className="text-white bg-slate-600 px-4 rounded-r-md text-xl py-2 active:scale-105"
              onClick={copyPass}
            >
              Copy
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 font-semibold text-xl mt-3 capitalize items-center">
            <div className="md:w-1/3">
              <input
                type="range"
                value={length}
                min={8}
                max={32}
                onChange={(e) => setLength(e.target.value)}
                className="cursor-pointer"
              />
              <label htmlFor="length" className="text-white ml-2">
                Length: {length}
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                type="checkbox"
                defaultChecked={number}
                onChange={() => setNumber((prev) => !prev)}
              />
              <label htmlFor="number" className="text-white ml-2">
                Number
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                type="checkbox"
                defaultChecked={symbol}
                onChange={() => setSymbol((prev) => !prev)}
              />
              <label htmlFor="symbol" className="text-white ml-2">
                Symbol
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="text-white p-3 bg-gray-500 rounded-sm active:scale-95"
              onClick={generatePassword}
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
