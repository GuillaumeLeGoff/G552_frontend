import { Accordion } from "@mui/material";

import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import PermMediaIcon from '@mui/icons-material/PermMedia';


import React from "react";


function EventParam() {
  return (
    <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ backgroundColor: "#203038" }}
        >
          <IconButton>
            <PermMediaIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography color={"white"} style={{ padding: "8px" }}>
            Event
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            maxHeight: "63vh",
            /*  overflowY: "scroll", */
            justifyContent: "center",
            backgroundColor: "#203038",
          }}
        >
        </AccordionDetails>
      </Accordion>
  )
}

export default EventParam