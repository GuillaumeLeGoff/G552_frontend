import React, { useContext, useState } from "react";
import { Box, ImageList, ImageListItem, Paper, Stack } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { LoadingContext } from "../../contexts/Context";
import { useTranslation } from "react-i18next";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

import EventMediaService from "../../services/eventMediaService";
import UploadService from "../../services/uploadService";
import DeleteMediaDialog from "../dialogs/DeleteMediaDialog";
import CropsModal from "../dialogs/CropsModal";

function Medias(props) {
  const { t } = useTranslation(); // Utilisation de useTranslation
  const uploadService = UploadService();

  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogUpload, setDialogUpload] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [FileToDelete, setFileToDelete] = useState();
  const [imageToCrop, setImageToCrop] = useState(null);
  const [originalName, setOriginalName] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const { setLoading } = useContext(LoadingContext);
  const { setProgress } = useContext(LoadingContext);

  const handleTouchStart = (imageId) => {
    clearTimeout(longPressTimer);
    setLongPressTimer(
      setTimeout(() => {
        if (imageId === selectedImage) {
          setSelectedImage(null);
        } else {
          setSelectedImage(imageId);
        }
      }, 500)
    ); // Appui long de 500 ms
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  function DeleteFile() {
    EventMediaService.deleteAllByMedia(FileToDelete.idBdd).then(() => {
      uploadService.deleteFile(FileToDelete).then((result) => {
        displayDialogDelete(false);
        props.getMedias();
        props.getEvents();
      });
    });
  }

  function displayDialogUpload() {
    console.log("displayDialogUpload");
    setDialogUpload(!dialogUpload);
    setImageToCrop(null);
  }

  function OpenDialogDelete(file) {
    displayDialogDelete(true);
    setFileToDelete(file);
  }
  function displayDialogDelete() {
    setDialogDelete(!dialogDelete);
  }

  function goToCrop(event) {
    console.log("upload");
    if (event && event.target.files[0].type.split("/")[0] === "video") {
      uploadService
        .upload(setLoading, event.target.files[0], setProgress)
        .then(() => {
          props.getMedias();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setOriginalName(event.target.files[0].name);
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageToCrop(reader.result));
      reader.readAsDataURL(event.target.files[0]);
      setMediaType(event.target.files[0].type.split("/")[0]);
      displayDialogUpload();
    }
    setSelectedImage(null);
  }

  function uploadMediaCropped(event) {
    const fileWithOriginalName = new File([event[0]], originalName, {
      type: "image/jpeg",
    });

    uploadService
      .upload(setLoading, fileWithOriginalName, setProgress)
      .then(() => {
        props.getMedias();
      })
      .catch((error) => {
        console.error(error);
      });

    displayDialogUpload();
    setImageToCrop(null);
  }

  function handleImageClick(imageId) {
    if (imageId === selectedImage) {
      setSelectedImage(null);
    } else {
      setSelectedImage(imageId);
    }
  }

  return (
    <Box>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton className="headerButton">
              <ImageIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              {t("Media.title")}
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton
              className="headerButton"
              onClick={() => {
                document.getElementById("inputFile").click();
              }}
            >
              <AddIcon sx={{ color: "secondary.main" }} />
            </IconButton>

            <input
              type="file"
              id="inputFile"
              style={{ display: "none" }}
              onChange={goToCrop}
            />
          </Box>
        </Stack>

        <Droppable
          droppableId={`${props.eventMedia[1].id}`}
          isDropDisabled={true}
        >
          {(provided) => (
            <div ref={provided.innerRef}>
              {props.eventMedia[1].medias ? (
                props.eventMedia[1].medias.length > 0 ? (
                  <Box className="containerPage">
                    <ImageList variant="masonry" cols={2} gap={8}>
                      {props.eventMedia[1].medias.map((file, index) => (
                        <ImageListItem key={file.id}>
                          <Draggable
                            disableInteractiveElementBlocking
                            key={file.id}
                            draggableId={file.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <React.Fragment>
                                <Box
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  onTouchStart={() => handleTouchStart(file.id)}
                                  onTouchEnd={handleTouchEnd}
                                >
                                  {file.type === "video" ? (
                                    <Box>
                                      <Box
                                        component="video"
                                        onClick={() =>
                                          handleImageClick(file.id)
                                        }
                                        alt={file.title}
                                        sx={{
                                          width: "100%",
                                          opacity:
                                            file.id === selectedImage
                                              ? 0.75
                                              : 1,
                                        }}
                                        ref={(ref) => {
                                          if (ref && file.type === "video") {
                                            ref.currentTime = 10;
                                          }
                                        }}
                                        src={file.path}
                                      ></Box>
                                      <PlayCircleFilledIcon
                                        sx={{
                                          position: "absolute",
                                          top: "50%",
                                          left: "50%",
                                          transform: "translate(-50%, -50%)",
                                          opacity: 0.7,
                                          fontSize: "50px",
                                        }}
                                      />
                                    </Box>
                                  ) : (
                                    <Box
                                      component="img"
                                      onClick={() => handleImageClick(file.id)}
                                      src={file.path}
                                      alt={file.title}
                                      sx={{
                                        width: "100%",
                                        opacity:
                                          file.id === selectedImage ? 0.75 : 1,
                                      }}
                                    />
                                  )}
                                  {file.id === selectedImage && (
                                    <DeleteIcon
                                      onClick={() => OpenDialogDelete(file)}
                                      color="warning"
                                      sx={{
                                        position: "absolute",
                                        top: "5px",
                                        right: "5px",
                                      }}
                                    />
                                  )}
                                </Box>
                              </React.Fragment>
                            )}
                          </Draggable>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                ) : (
                  <Box className="infoPage">
                    <Typography color="text.secondary">
                      {t("Media.add")}
                    </Typography>
                  </Box>
                )
              ) : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>
      {/* Modal upload  */}

      <CropsModal
        open={dialogUpload}
        onClose={displayDialogUpload}
        imageToCrop={imageToCrop}
        uploadMediaCropped={uploadMediaCropped}
        mediaType={mediaType}
      />
      {/* Modal confirm suppression file */}
      <DeleteMediaDialog
        open={dialogDelete}
        onClose={displayDialogDelete}
        DeleteFile={DeleteFile}
        displayDialogDelete={displayDialogDelete}
      />
    </Box>
  );
}

export default Medias;
