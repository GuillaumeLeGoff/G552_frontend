import {
  Button,
  Fab,
  Modal,
  Paper,
  Stack,
  Table,
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

import React, { useState } from "react";
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

function EventParam() {
  const [modalOpen, setModalOpen] = useState(false);

  function handleOpenModal() {
    setModalOpen(true);
  }
  function handleCloseModal() {
    setModalOpen(false);
  }
  return (
    <div>
      <Paper
        sx={{
          backgroundColor: "primary.main",
          position: "relative",
        }}
      >
        <Stack direction="row" spacing={0}>
          <IconButton sx={{ ml: 2 }}>
            <PermMediaIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" color={"white"} sx={{ padding: 2 }}>
            Event
          </Typography>
        </Stack>
        <Box p={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Durée</TableCell>

                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            {/*  <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
            <Fab
              onClick={handleOpenModal}
              color="secondary"
              size="small"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
            >
              <AddIcon />
            </Fab>
          </Table>
        </Box>
      </Paper>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <IconButton
            style={{ position: "absolute", right: "5px", top: "5px" }}
            onClick={handleCloseModal}
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
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" disableElevation color="secondary">
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

export default EventParam;
