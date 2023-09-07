import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { useTranslation } from "react-i18next"; // Importer useTranslation depuis react-i18next
import eventService from "../../../services/eventService";
import macroService from "../../../services/macroService";
import "./Macro.css";

function Macro() {
  const { t } = useTranslation(); // Utiliser le hook useTranslation pour la traduction
  const [macros, setMacros] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvent();
    getMacro();
  }, []);

  function getEvent() {
    eventService.get().then((result) => {
      setEvents(result.data);
    });
  }

  function getMacro() {
    macroService.getById().then((result) => {
      const sortedData = result.data.sort((a, b) => a.button_id - b.button_id);
      const updatedData = sortedData.map((macro) => {
        return { ...macro, event_id: macro.event_id || 0 };
      });
      setMacros(updatedData);
    });
  }

  function updateMacro(macro) {
    if (macro.event_id === "choisir event") {
      macro.event_id = null;
    }
    macroService.update(macro).then((result) => {});
  }

  return (
    <Grid item xs={12}>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <div className="headerLeft">
            <IconButton>
              <KeyboardIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              {t("macro.title")} {/* Utiliser t("clé de traduction") pour traduire le titre */}
            </Typography>
          </div>
        </Stack>
        <Box className="containerMacro">
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t("macro.number")}</TableCell> {/* Traduire l'en-tête du numéro */}
                <TableCell className="tableCellRight" align="right">
                  {t("macro.event")} {/* Traduire l'en-tête de l'événement */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {macros !== null
                ? macros.map((macro, index1) => (
                    <TableRow key={macro.button_id}>
                      <TableCell>{macro.button_id}</TableCell>
                      <TableCell align="right">
                        <Select
                          align="left"
                          className="selectEvent"
                          value={macro.event_id || "choisir event"}
                          onChange={(e) => {
                            const updatedData = macros.map((macro, index2) => {
                              if (index1 === index2) {
                                updateMacro({
                                  ...macro,
                                  event_id: e.target.value,
                                });
                                return { ...macro, event_id: e.target.value };
                              }
                              return macro;
                            });
                            setMacros(updatedData);
                          }}
                        >
                          <MenuItem value="choisir event">{t("macro.none")}</MenuItem> {/* Traduire l'option "aucun" */}
                          {events.map((event) => (
                            <MenuItem key={event.id} value={event.id}>
                              {event.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Macro;
