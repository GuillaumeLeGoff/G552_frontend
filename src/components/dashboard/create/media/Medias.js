import {
  Accordion,
  ImageList,
  ImageListItem,
  Fab,
  Modal,
  Box,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useDropzone } from "react-dropzone";

import React, { useEffect, useState } from "react";
import authService from "../../../../services/authService";
import uploadService from "../../../../services/uploadService";
import fileService from "../../../../services/fileService";

import "../../../../styles/Media.css";

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

function Media() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadFile, setUploadFile] = useState();
  const [modalOpenUpload, setModalOpenUpload] = useState(false);
  const [modalOpenSup, setModalOpenSup] = useState(false);
  const [FileToDelete, setFileToDelete] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (files) => uploadOneFile(files),
  });

  useEffect(() => {
    getUploadFile();
  }, []);
  function DeleteFile() {
    console.log("result");
    uploadService.delete(FileToDelete).then(() => {
      handleCloseModalSup();
      getUploadFile();
    });
  }
  function handleOpenModalUpload() {
    setModalOpenUpload(true);
  }
  function handleCloseModal() {
    setModalOpenUpload(false);
  }
  function handleOpenModalSup(file) {
    setModalOpenSup(true);
    setFileToDelete(file);
  }
  function handleCloseModalSup() {
    setModalOpenSup(false);
  }

  function getUploadFile() {
    uploadService.get().then((result) => {
      setUploadFile(result.data);
    });
  }

  function uploadOneFile(event) {
    uploadService
      .upload(event[0])
      .then(() => {
        getUploadFile();
      })
      .catch((error) => {
        console.error(error);
      });

    handleCloseModal();
  }

  function handleImageClick(imageId) {
    if (imageId === selectedImage) {
      setSelectedImage(null);
    } else {
      setSelectedImage(imageId);
    }
  }
  return (
    <div>
      <Paper
        sx={{
          backgroundColor: "primary.main",
          position: "relative",
        }}
      >
       <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 2 }}>
              <ImageIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" color="white" sx={{ padding: 2 }}>
              Media
            </Typography>
          </div>

          <IconButton onClick={handleOpenModalUpload}>
            <AddIcon color="secondary" />
          </IconButton>
        </Stack>
        <Box p={1} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}>
          <ImageList variant="masonry" cols={2} gap={8}>
            {uploadFile
              ? uploadFile.map((file) => (
                  <ImageListItem key={file.id}>
                    {file.type.split("/").splice(0, 1).toString() ===
                    "image" ? (
                      <div>
                        <img
                          onClick={() => handleImageClick(file.id)}
                          src={file.path}
                          alt={file.title}
                          className={`${
                            file.id === selectedImage
                              ? "image"
                              : "selected-image"
                          }`}
                          loading="lazy"
                        />
                        {file.id === selectedImage && (
                          <DeleteIcon
                            onClick={() => handleOpenModalSup(file)}
                            color="warning"
                            sx={{ position: "absolute", top: 5, right: 5 }}
                          />
                        )}
                      </div>
                    ) : (
                      <video
                        src={`${file.path}`}
                        sx={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </ImageListItem>
                ))
              : ""}
          </ImageList>
        </Box>
      </Paper>
      {/* Modal upload  */}
      <Modal open={modalOpenUpload} onClose={handleCloseModal}>
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
            Upload
          </Typography>
          <section className="dropZone">
            <div {...getRootProps({ className: "dropzone" })}>
              <input onDrop={(e) => uploadOneFile(e)} {...getInputProps()} />
              <div className="modal">
                <CloudUploadIcon style={{ color: "white", fontSize: "4rem" }} />
                <em className="textDropZone">
                  Drag 'n' drop some files here, or click to select files
                </em>
                <em className="textDropZone">
                  (Only images and videos will be accepted)
                </em>
              </div>
            </div>
          </section>
        </Box>
      </Modal>

      {/* Modal confirm suppression file */}
      <Modal open={modalOpenSup} onClose={handleCloseModalSup}>
        <Box sx={style}>
          <IconButton
            style={{ position: "absolute", right: "5px", top: "5px" }}
            onClick={handleCloseModalSup}
          >
            <CloseIcon color="secondary" />
          </IconButton>
          <Typography
            mb={2}
            color={"white"}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Delete Media
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={DeleteFile}
              variant="contained"
              disableElevation
              color="secondary"
            >
              Confirme
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default Media;
