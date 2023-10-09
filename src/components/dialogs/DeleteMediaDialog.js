import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from 'react-i18next';

function DeleteMediaDialog({ open, onClose, DeleteFile, displayDialogDelete }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('confirmMediaDeletion')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('areYouSureToDeleteMedia')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={displayDialogDelete} sx={{ color: "secondary.main" }}>
          {t('cancel')}
        </Button>
        <Button onClick={DeleteFile} sx={{ color: "secondary.main" }}>
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteMediaDialog;
