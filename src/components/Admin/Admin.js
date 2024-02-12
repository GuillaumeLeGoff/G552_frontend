import { IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid, Paper, Stack } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AdminService from "../../services/adminService";

function AdminPage() {
  const { t } = useTranslation();
  const [admin, setAdmin] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  useEffect(() => {
    getAdmin();
  }, []);

  async function getAdmin() {
    const result = await AdminService.getAdmin();
    console.log("result", result);
    setAdmin(result);
    console.log(result[0]);
    setSerialNumber(result.serialnumber);
  }

  async function updateSerialNumber(event) {
    setSerialNumber(event.target.value);
    console.log("test");
    const adminUpdates = { ...admin, serialNumber };
    await AdminService.updateAdmin(adminUpdates);
  }


  return (
    <Grid item>
      <Paper className="mainPaperPage">
        <Stack className="headerTitlePage">
          <Box className="headerLeft">
            <IconButton>
              <AdminPanelSettingsIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              {t("Admin.title")}
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Box className="containerPage" sx={{ paddingTop: "0" }}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <IconButton disabled>
                {/*   <LockIcon sx={{ color: "text.secondary" }} /> */}
              </IconButton>
              <Typography
                variant="h8"
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  padding: "0",
                  height: "20%",
                }}
              >
                {t("Admin.serialNumber")}
              </Typography>
              <TextField
                sx={{
                  width: "30%",
                }}
                fullWidth
                id="standard-basic"
                autoComplete="off"
                value={serialNumber}
                onChange={updateSerialNumber}
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default AdminPage;