import { ImageList, ImageListItem, Box, Stack, Paper } from "@mui/material";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";

import "../../../../styles/Media.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

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

function Medias({ eventMedia, setEventMedia }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const [modalOpenUpload, setModalOpenUpload] = useState(false);
  const [modalOpenSup, setModalOpenSup] = useState(false);
  const [FileToDelete, setFileToDelete] = useState();
  /*  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (files) => uploadOneFile(files),
  }); */

  /*  function DeleteFile() {
    console.log("result");
    uploadService.delete(FileToDelete).then(() => {
      handleCloseModalSup();
      getUploadFile();
    });
  } */
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

  /* function getUploadFile() {
    uploadService.get().then((result) => {
      setUploadFile(result.data);
    });
  }
 */
  /*  function uploadOneFile(event) {
    uploadService
      .upload(event[0])
      .then(() => {
        getUploadFile();
      })
      .catch((error) => {
        console.error(error);
      });

    handleCloseModal();
  } */

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
          position: "relative",
          minHeight: "calc(83vh )",
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

        <Box p={1} style={{ overflow: "auto" }}>
          <ImageList variant="masonry" cols={2} gap={8}>
            <Droppable
              key={eventMedia[1]}
              droppableId={`${eventMedia[1].id}`}
              isDropDisabled={true}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {eventMedia
                    ? eventMedia[1].medias.map((file, index) => (
                        <ImageListItem key={file.id}>
                          <Draggable
                            key={file.id}
                            draggableId={file.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
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
                                    sx={{
                                      position: "absolute",
                                      top: 5,
                                      right: 5,
                                    }}
                                  />
                                )}
                              </div>
                            )}
                          </Draggable>
                        </ImageListItem>
                      ))
                    : ""}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </ImageList>
        </Box>
      </Paper>
      {/* Modal upload  */}
      {/* <Modal open={modalOpenUpload} onClose={handleCloseModal}>
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
      </Modal> */}

      {/* Modal confirm suppression file */}
      {/* <Modal open={modalOpenSup} onClose={handleCloseModalSup}>
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
      </Modal> */}
    </div>
  );
}

export default Medias;
