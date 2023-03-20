import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import Crop from "./crop/Crop";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ImageList,
  ImageListItem,
  Modal,
  Paper,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useCallback, useState } from "react";
import EventMediaService from "../../../../services/eventmediaService";
import mediaService from "../../../../services/UploadService";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";
import "../../../../styles/Media.css";
function Medias(props) {
  const style = {
    height: "100%",
    width: "100%",
    bgcolor: "#203038",
    p: 4,
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogUpload, setDialogUpload] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [FileToDelete, setFileToDelete] = useState();
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [originalName, setOriginalName] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "video/mp4": [],
    },
    onDrop: (files) => goToCrop(files),
  });

  function DeleteFile() {
    console.log("result");

    mediaService.delete(FileToDelete).then(() => {
      EventMediaService.deleteAllByMedia(FileToDelete.idBdd).then((result) => {
        console.log(result);
        displayDialogDelete(false);
        props.getMedias();
        props.getEvents();
      });
    });
  }

  function displayDialogUpload() {
    setDialogUpload(!dialogUpload);
  }

  function OpenDialogDelete(file) {
    displayDialogDelete(true);
    setFileToDelete(file);
  }
  function displayDialogDelete() {
    setDialogDelete(!dialogDelete);
  }

  

  function goToCrop(event) {
    setOriginalName(event[0].name);
    const reader = new FileReader();
    reader.addEventListener("load", () => setImageToCrop(reader.result));
    reader.readAsDataURL(event[0]);
  }

  function uploadMediaCroped(event) {
    console.log(event[0]);
    const fileWithOriginalName = {
      ...event,
      originalFileName: [originalName],
    };
    
    mediaService
      .upload(fileWithOriginalName)
      .then(() => {
        props.getMedias();
      })
      .catch((error) => {
        console.error(error);
      });
    displayDialogUpload();
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
        className="paper-container"
        style={{
          maxHeight: "calc(94vh - 56px )",
          minHeight: "calc(94vh - 56px )",
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

          <IconButton onClick={displayDialogUpload}>
            <AddIcon color="secondary" />
          </IconButton>
        </Stack>

        <Box
          sx={{ maxHeight: "calc(94vh - 120px)", overflowY: "scroll" }}
          p={1}
        >
          <ImageList variant="masonry" cols={2} gap={8}>
            <Droppable
              droppableId={`${props.eventMedia[1].id}`}
              isDropDisabled={true}
            >
              {(provided) => (
                <div ref={provided.innerRef}>
                  {props.eventMedia
                    ? props.eventMedia[1].medias.map((file, index) => (
                        <ImageListItem key={file.id}>
                          <Draggable
                            disableInteractiveElementBlocking
                            key={file.id}
                            draggableId={file.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <React.Fragment>
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  {file.type === "video" ? (
                                    <video
                                      onClick={() => handleImageClick(file.id)}
                                      alt={file.title}
                                      className={`${
                                        file.id === selectedImage
                                          ? "image"
                                          : "selected-image"
                                      }`}
                                    >
                                      <source
                                        src={file.path}
                                        type="video/mp4"
                                      />
                                    </video>
                                  ) : (
                                    <div>
                                      <img
                                        onClick={() =>
                                          handleImageClick(file.id)
                                        }
                                        src={file.path}
                                        alt={file.title}
                                        className={`${
                                          file.id === selectedImage
                                            ? "image"
                                            : "selected-image"
                                        }`}
                                      />
                                    </div>
                                  )}
                                  {file.id === selectedImage && (
                                    <DeleteIcon
                                      onClick={() => OpenDialogDelete(file)}
                                      color="warning"
                                      sx={{
                                        position: "absolute",
                                        top: 5,
                                        right: 5,
                                      }}
                                    />
                                  )}
                                </div>
                                {/* {snapshot.isDragging && (
                                  <div>
                                    {file.type === "video" ? (
                                      <video
                                      alt={file.title}
                                      className="selected-image"
                                    >
                                      <source
                                        src={file.path}
                                        type="video/mp4"
                                      />
                                    </video>
                                    ) : (<img
                                      style={{ display: "none !important" }}
                                      src={file.path}
                                      alt={file.title}
                                      className="selected-image"
                                    />
                                    )}
                                  </div>
                                )} */}
                              </React.Fragment>
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
      <Modal open={dialogUpload} onClose={displayDialogUpload}>
        <Box sx={style}>
          {/* <IconButton
            style={{ position: "absolute", right: "5px", top: "5px" }}
            onClick={displayDialogUpload}
          >
            <CloseIcon color="secondary" />
          </IconButton> */}
          <Typography
            color={"white"}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Upload
          </Typography>
          {imageToCrop ? (
            <>
              <Crop imageToCrop={imageToCrop} uploadMediaCroped={uploadMediaCroped}/>
            </>
          ) : (
            <section className="dropZone">
              <div {...getRootProps({ className: "dropzone" })}>
                <input onDrop={(e) => goToCrop(e)} {...getInputProps()} />
                <div className="modal">
                  <CloudUploadIcon
                    style={{ color: "white", fontSize: "4rem" }}
                  />
                  <em className="textDropZone">Click to select files</em>
                  <em className="textDropZone">
                    (Only images and videos will be accepted)
                  </em>
                </div>
              </div>
            </section>
          )}
        </Box>
      </Modal>

      {/* Modal confirm suppression file */}
      <Dialog open={dialogDelete} onClose={displayDialogDelete}>
        <DialogTitle>{"Delete Media"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Voulez-vous supprimer ce media?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "white" }} onClick={DeleteFile}>
            Confirme
          </Button>
          <Button sx={{ color: "white" }} onClick={displayDialogDelete}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Medias;
