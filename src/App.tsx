import { useState } from "react";
import "./App.scss";

function App() {
  const [password, updatePassword] = useState("");
  const [numOfChars, updateNumOfChars] = useState(0);
  const [useCapital, toggleCapital] = useState(false);
  const [useSmall, toggleSmall] = useState(false);
  const [useNumber, toggleNumber] = useState(false);
  const [useSpecialChar, toggleSpecialChar] = useState(false);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="display-wrapper">
            <div className="display">{password}</div>
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(password);
              }}
            >
              <span></span>
            </button>
          </div>
          <div className="btns-container">
            <div className="text-container">
              <label>Number of characters</label>
              <input
                type="number"
                min="0"
                step="1"
                value={numOfChars}
                onChange={(event) =>
                  updateNumOfChars(parseInt(event.target.value))
                }
              />
              <button
                className="upArrow"
                onClick={() => updateNumOfChars(numOfChars + 1)}
              >
                <i className="up"></i>
              </button>
              <button
                className="downArrow"
                onClick={() =>
                  updateNumOfChars(numOfChars > 0 ? numOfChars - 1 : 0)
                }
              >
                <i className="down"></i>
              </button>
            </div>
            <div className="checkbox-container">
              <div className="custom-input">
                <input
                  type="checkbox"
                  checked={useCapital}
                  onChange={() => toggleCapital(!useCapital)}
                />
                <label>Use atleast one uppercase letter</label>
              </div>
              <div className="custom-input">
                <input
                  type="checkbox"
                  checked={useSmall}
                  onChange={() => toggleSmall(!useSmall)}
                />
                <label>Use atleast one lowercase letter</label>
              </div>
              <div className="custom-input">
                <input
                  type="checkbox"
                  checked={useNumber}
                  onChange={() => toggleNumber(!useNumber)}
                />
                <label>Use atleast one number</label>
              </div>
              <div className="custom-input">
                <input
                  type="checkbox"
                  checked={useSpecialChar}
                  onChange={() => toggleSpecialChar(!useSpecialChar)}
                />
                <label>Use atleast one special character</label>
              </div>
            </div>
            <button
              className="btn"
              onClick={() =>
                updatePassword(
                  generatePassword(
                    useCapital,
                    useSmall,
                    useNumber,
                    useSpecialChar,
                    numOfChars
                  )
                )
              }
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function generatePassword(
  capital: boolean,
  small: boolean,
  num: boolean,
  specialChar: boolean,
  charLength: number
) {
  let pass = "";
  let characterPool = "";
  characterPool += capital ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  characterPool += small ? "abcdefghijklmnopqrstuvwxyz" : "";
  characterPool += num ? "0123456789" : "";
  characterPool += specialChar ? "_&@" : "";
  for (let i = 1; i <= charLength; i++) {
    const char = Math.floor(Math.random() * characterPool.length + 1);
    pass += characterPool.charAt(char);
  }
  return pass;
}

export default App;
