import React from "react";
import { useTranslation } from "react-i18next";
export default function Wellcome() {
  const [t] = useTranslation();
  return (
    <div className="text-center">
      <h1>{t("wellcome")}</h1>
    </div>
  );
}
