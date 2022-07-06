import React, { useState, useEffect } from "react";
import axios from "axios";

const GOOGLE_API_URL =
  "https://translation.googleapis.com/language/translate/v2";
const API_KEY = "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM";

const Convert = ({ language, text }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const Timer = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(Timer);
    };
  }, [text]);

  useEffect(() => {
    const translation = async () => {
      const { data } = await axios.post(
        GOOGLE_API_URL,
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: API_KEY,
          },
        }
      );
      setTranslatedText(data.data.translations[0].translatedText);
    };

    translation();
  }, [language, debouncedText]);

  return <div>{translatedText}</div>;
};

export default Convert;
