import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    setSelectedLanguage(i18n.language);
    console.log(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <Box>
      <FormControl>
        <InputLabel>{selectedLanguage}</InputLabel>
        <Select value={selectedLanguage} onChange={changeLanguage}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="pl">Polski</MenuItem>
          <MenuItem value="de">Deutsch</MenuItem>
          <MenuItem value="es">Español</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default LanguageSelector;
