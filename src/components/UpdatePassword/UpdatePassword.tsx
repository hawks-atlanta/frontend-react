import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";

export function UpdatePassword() {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const isFormValid = () => {
    return rpassword === password;
  };

  const isSecurePassword = (password: string) => {
    return password.length >= 8;
  };

  return (
    <Dialog open={showConfirmation} onClose={handleConfirmationClose}>
      <DialogTitle>Nueva contraseña</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            placeholder="Nueva contraseña"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Typography color={isSecurePassword(password) ? "success" : "error"}>
            {isSecurePassword(password)
              ? "Contraseña segura"
              : "Contraseña no segura"}
          </Typography>
          <TextField
            placeholder="Repetir contraseña"
            id="password"
            type="password"
            value={rpassword}
            onChange={(e) => setRPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Typography color={isFormValid() ? "success" : "error"}>
            {isFormValid()
              ? "Las contraseñas coinciden"
              : "Las contraseñas no coinciden"}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!isFormValid()}
          onClick={handleConfirmationClose}
          color="primary"
        >
          Actualizar
        </Button>
        <Button onClick={handleConfirmationClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
