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

function Macro() {
  const [macros, setMacros] = useState([
    { id: 1, name: "Macro 1", event: null },
    { id: 2, name: "Macro 2", event: null },
    { id: 3, name: "Macro 3", event: null },
    { id: 4, name: "Macro 4", event: null },
    { id: 5, name: "Macro 5", event: null },
    { id: 6, name: "Macro 6", event: null },
    { id: 7, name: "Macro 7", event: null },
    { id: 8, name: "Macro 8", event: null },
    { id: 9, name: "Macro 9", event: null },
    { id: 10, name: "Macro 10", event: null },
  ]);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvent();
  }, []);

  function getEvent() {
    eventService.get().then((result) => {
      setEvents(result.data);
      console.log(result.data);
    });
  }

  return (
    <Grid item xs={12}>
      <div>
        <Paper style={{ maxHeight: "calc(94vh - 56px )"}}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton sx={{ ml: 2 }}>
                <KeyboardIcon sx={{ color: "white" }} />
              </IconButton>
              <Typography variant="h6" color="white" sx={{ padding: 2 }}>
                Macro
              </Typography>
            </div>
          </Stack>
          <Box sx={{ maxHeight: "calc(94vh - 120px)", overflowY: "scroll" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Event</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {macros.map((macro) => (
                  <TableRow key={macro.id}>
                    <TableCell>{macro.name}</TableCell>
                    <TableCell>
                      <Select
                        value={macro.event}
                        onChange={(event) =>
                          setMacros((prevMacros) =>
                            prevMacros.map((prevMacro) =>
                              prevMacro.id === macro.id
                                ? { ...prevMacro, event: event.target.value }
                                : prevMacro
                            )
                          )
                        }
                      >
                        {events.map((event) => (
                          <MenuItem key={event.id} value={event}>
                            {event.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </div>
    </Grid>
  );
}

export default Macro;
