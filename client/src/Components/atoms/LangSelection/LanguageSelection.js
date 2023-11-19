import React, { useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import i18next from "i18next";
import cookies from "js-cookie";

const languages = [
  {
    code: "en",
    text: "English",
    value: "en",
    country_code: "gb",
  },
  {
    code: "fr",
    text: "Français",
    value: "fr",
    country_code: "fr",
  },

  {
    code: "ar",
    value: "ar",
    text: "العربية",
    dir: "rtl",
    country_code: "sa",
  },
];

export default function LanguageSelection(props) {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find(
    (l) => l.value === currentLanguageCode,
  );

  useEffect(() => {
    document.body.dir = languages.dir || "ltr";
  }, [currentLanguage]);

  return (
    <div>
      <Dropdown
        button
        className="icon"
        floating
        labeled
        text="Translate"
        icon="world"
        options={languages}
        onChange={(e, data) => {
          i18next.changeLanguage(data.value);
        }}
      />
      {props.children}
    </div>
  );
}
