import {
  Button,
  Fab,
  Grid,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

/* import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary"; */
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import eventService from "../../../../services/eventService";
import EditIcon from "@mui/icons-material/Edit";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#203038",
  boxShadow: 24,
  p: 4,
};

function EventList({ onEventClick }) {
  useEffect(() => {
    console.log('test');
    getEvent();
  }, []);
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState();

  function getEvent() {
    eventService.get().then((result) => {
      setEvent(result.data);
      console.log(result.data);
    });
  }
  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function addEvent() {
    eventService.create(name).then(() => {
      toggleModal();
      getEvent();
    });
  }

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ ml: 2 }}>
            <PermMediaIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" color="white" sx={{ padding: 2 }}>
            Event
          </Typography>
        </div>

        <IconButton onClick={toggleModal}>
          <AddIcon color="secondary" />
        </IconButton>
      </Stack>

      <Box p={1}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Durée</TableCell>

              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {event
              ? event.map((row) => (
                  <TableRow
                    sx={{
                      "&:hover": {
                        backgroundColor: "secondary.main",
                      },
                    }}
                    onClick={() => onEventClick(row.id)}
                    key={row.id}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">00:00</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <EditIcon sx={{ fontSize: 15 }} color="secondary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </Box>

      <Modal open={modalOpen} onClose={toggleModal}>
        <Box sx={style}>
          <IconButton
            style={{ position: "absolute", right: "5px", top: "5px" }}
            onClick={toggleModal}
          >
            <CloseIcon color="secondary" />
          </IconButton>
          <Typography
            color={"white"}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            New Event
          </Typography>

          <TextField
            margin="normal"
            id="standard-basic"
            label="Name"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <Stack direction="row" spacing={2}>
            <Button
              disabled={!name}
              variant="contained"
              disableElevation
              color="secondary"
              onClick={addEvent}
            >
              Add
            </Button>
            <Button variant="contained" disableElevation color="secondary">
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default EventList;
