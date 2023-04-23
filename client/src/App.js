import React, { useEffect, useRef, useState } from "react";
import languages from "./data/languages";
import "./App.css";
const App = () => {
  let [fromLanguage, setFromLanguage] = useState("en");
  let [toLanguage, setToLanguage] = useState("");
  let [text, setText] = useState("");
  let [translateText, setTranslateText] = useState("");
  let clickRef = useRef(false);
  let changeLanguageHandler = (e) => {
    setToLanguage(e.target.value);
  };
  let changeFromLanguageHandler = (e) => {
    setFromLanguage(e.target.value);
  };
  useEffect(() => {
    console.log(clickRef.current);

    if (clickRef.current) {
      translate();
    }
  }, [toLanguage]);
  useEffect(() => {
    if (text.trim().length == 0) {
      setTranslateText("");
    }
  }, [text]);
  useEffect(() => {
    let fetchTranslate = async () => {
      let res = await fetch("http://localhost:5000", {
        method: "POST",
        headers: { "Content-Type": "application/json    " },
        body: JSON.stringify({ to: fromLanguage, text }),
      });
      let data = await res.json();
      setText(data.translateText);
      console.log(data);
    };
    fetchTranslate();
  }, [fromLanguage]);
  let translate = async () => {
    let res = await fetch("http://localhost:5000", {
      method: "POST",
      headers: { "Content-Type": "application/json    " },
      body: JSON.stringify({ from: fromLanguage, to: toLanguage, text }),
    });
    let data = await res.json();
    setTranslateText(data.translateText);
    console.log(data);
    clickRef.current = true;
  };
  return (
    <>
      <header>
        <h1>QwickTranslator</h1>
      </header>
      <div className="container">
        <div className="input-control">
          <textarea
            type="text"
            value={text}
            placeholder="Enter Text To Translate"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="selects">
          <div>
            <h3>From:</h3>
            <select onChange={changeFromLanguageHandler} value={fromLanguage}>
              {languages.map((lang) => (
                <option value={lang.lang_key}>{lang.language}</option>
              ))}
            </select>
          </div>
          <div>
            <h3> To:{"  "}</h3>
            <select onChange={changeLanguageHandler} value={toLanguage}>
              {languages.map((lang) => (
                <option value={lang.lang_key}>{lang.language}</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={translate} className="btn-translate">Translate</button>
        {translateText && (
          <div className="box">
            <p>{translateText}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
