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
import eventService from "../../../services/eventService";
import macroService from "../../../services/macroService";
import "./Macro.css";
function Macro() {
  const [macros, setMacros] = useState(null);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvent();
    getMacro();
  }, []);

  function getEvent() {
    eventService.get().then((result) => {
      setEvents(result.data);
      console.log(result);
    });
  }
  function getMacro() {
    macroService.getById().then((result) => {
      const sortedData = result.data.sort((a, b) => a.button_id - b.button_id);
      const updatedData = sortedData.map((macro) => {
        return { ...macro, event_id: macro.event_id || 0 };
      });
      console.log(updatedData);
      setMacros(updatedData);
    });
  }
  function updateMacro(macro) {
    console.log(macro);
    if (macro.event_id === "choisir event") {
      macro.event_id = null;
    }
    macroService.update(macro).then((result) => {
      console.log(result);
    });
  }

  return (
    <Grid item xs={12}>
      <Paper className="mainPaper">
        <Stack className="headerSection">
          <div className="headerItemLeft">
            <IconButton>
              <KeyboardIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              Macro
            </Typography>
          </div>
        </Stack>
        <Box className="containerMacro">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {macros !== null
                ? macros.map((macro, index1) => (
                    <TableRow key={macro.button_id}>
                      <TableCell>{macro.button_id}</TableCell>
                      <TableCell>
                        <Select
                          value={macro.event_id || "choisir event"}
                          onChange={(e) => {
                            const updatedData = macros.map((macro, index2) => {
                              console.log(e.target.value);
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
                          <MenuItem value="choisir event">
                            choisir event
                          </MenuItem>
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
