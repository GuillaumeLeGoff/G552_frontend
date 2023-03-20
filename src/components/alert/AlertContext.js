import React, { createContext, useState } from "react";
import AlertSnackbar from "./AlertSnackbar";

export const AlertContext = createContext({
  alerts: [],
  addAlert: () => {},
  removeAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, severity = "success") => {
    const newAlert = { message, severity, id: Math.random() };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
      <AlertSnackbar />
    </AlertContext.Provider>
  );
};
