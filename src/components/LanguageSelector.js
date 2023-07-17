import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";



function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language.split('-')[0]);

  useEffect(() => {
    setSelectedLanguage(i18n.language.split('-')[0]);
  }, [i18n.language]);

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('i18nextLng', selectedLanguage);
  };



  return (
    <Box>
      <FormControl>
        <Select value={selectedLanguage} onChange={changeLanguage}>
          <MenuItem value="en">
            <img src={"/medias/flag/en.png"} alt="English" width={20} height={20} /> 
          </MenuItem>
          <MenuItem value="fr">
            <img src={"/medias/flag/fr.png"} alt="Français" width={20} height={20} /> 
          </MenuItem>
          <MenuItem value="pl">
            <img src={"/medias/flag/pl.png"} alt="Polski" width={20} height={20} /> 
          </MenuItem>
          <MenuItem value="de">
            <img src={"/medias/flag/de.png"} alt="Deutsch" width={20} height={20} /> 
          </MenuItem>
          <MenuItem value="es">
            <img src={"/medias/flag/es.png"} alt="Español" width={20} height={20} /> 
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default LanguageSelector;
