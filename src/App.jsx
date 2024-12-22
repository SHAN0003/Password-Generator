import { useRef } from "react";
import { useCallback, useEffect } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  // useCallback is a React Hook that lets you cache a function definition between re-renders.
  // const cachedFn = useCallback(fn, dependencies)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!@#$%^&*()+_[{}]";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  //function for copy text to clipboard
  const copyPasswordToClipboard = useCallback(() => {

    // use of useRef hook
    // hight-lighting the copied text by Referance
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password)
  }, [password])

  // useEffect(setup, dependencies?)
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <div className="flex text-center justify-center items-center my-10">
      <div className="w-1/2 p-5 bg-gray-700">
        <h1 className="text-4xl text-white text-center">Password generator</h1>
        <input
          type="text"
          value={password}
          className="w-2/3 m-5 p-3 rounded-xl text-lg"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button className="bg-blue-800 p-3 rounded-xl text-lg text-white active:bg-blue-700" onClick={copyPasswordToClipboard}>
          copy
        </button>
        <div className="flex text-center justify-center items-center gap-4">
          <input
            type="range"
            className="cursor-pointer"
            min={8}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="text-orange-600 text-lg">Length: {length}</label>
          <div className="flex text-center justify-center items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="text-orange-600 text-lg">Number</label>
          </div>
          <div className="flex text-center justify-center items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="text-orange-600 text-lg">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
