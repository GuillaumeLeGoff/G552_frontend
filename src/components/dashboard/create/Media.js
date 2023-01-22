import { Accordion, Button, ImageList } from "@mui/material";

import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";

import ImageIcon from "@mui/icons-material/Image";
import React, { useState } from "react";
import authService from "../../../services/authService";
import uploadService from "../../../services/uploadService";
import fileService from "../../../services/fileService";

function Media() {
  const [newFile, setNewFile] = useState();

  function uploadFile(event) {
    if (event.target.files[0] != null) {
      var cryptName = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 20; i++) {
        cryptName += possible.charAt(
          Math.floor(Math.random() * possible.length)
        );
      }
      const name = cryptName;
      const format = event.target.files[0].type.split("/").pop();
      const _user = authService.getCurrentUser().username;
      const path = "/media/" + name + "." + format;
      setNewFile({
        name,
        format,
        _user,
        path,
      });
      uploadService.upload(event.target.files)
      fileService.post(newFile)
    }
  }
  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ backgroundColor: "#203038" }}
        >
          <IconButton>
            <ImageIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography color={"white"} style={{ padding: "8px" }}>
            Médias
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
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
              accept="image/*,video/*"
              multiple
              type="file"
              onChange={(e) => uploadFile(e)}
            />
          </Button>

          <ImageList variant="masonry" gap={8}>
            {/*  { props.files.map((item) => (
                            !AuthService.getCurrentUser() ? null
                                :
                                item._user !== AuthService.getCurrentUser().username ?
                                    null
                                    : <ImageListItem key={item.img} cols={item.cols || 0} rows={item.rows || 0}>
                                        {item.type === "image" ?
                                            <a
                                                href="#!" key={item._id + 1}
                                                onClick={props.updateCurrentFile.bind(this, item)}
                                                style={{width: "248px", fit: "crop", auto: "format"}}
                                            >
                                                <img
                                                    src={process.env.PUBLIC_URL + `${item.path}?w=248&fit=crop&auto=format`}
                                                    srcSet={`${item.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={item.title}
                                                    style={{width: "100%"}}
                                                    loading="lazy"
                                                />
                                            </a>
                                            :
                                            <div>
                                                <a
                                                    href="#!" key={item._id + 1}
                                                    onClick={props.updateCurrentFile.bind(this, item)}
                                                    style={{width: "248px", fit: "crop", auto: "format"}}
                                                >
                                                    <video
                                                        src={`${item.path}?w=248&fit=crop&auto=format`}
                                                        srcSet={`${item.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                        style={{width: "100%", height: "100%"}}

                                                    />
                                                </a>
                                            </div>

                                        }
                                    </ImageListItem>
                        ))} */}
          </ImageList>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Media;
