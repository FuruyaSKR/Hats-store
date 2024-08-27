import React, { useState } from "react";
import { Column, Line } from "../../styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { createNewUser, getAllUsers } from "../../services/usersService";
import { enqueueSnackbar } from "notistack";

const Collections: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const handleSubmit = async () => {
    const newPayload = {
      username: login,
      password: password,
    };
    try {
      await createNewUser(newPayload);
      enqueueSnackbar("Dados salvos com sucesso!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Ocorreu um erro ao salvar os dados", {
        variant: "error",
      });
    }
  };

  const handleGetUserData = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setData(response.data);
      enqueueSnackbar("Dados salvos com sucesso!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Ocorreu um erro ao salvar os dados", {
        variant: "error",
      });
    }
    setLoading(false);
  };

  const renderCardComponent = (data: any) => {
    return (
      <Card
        sx={{
          borderRadius: 2,
          backgroundColor: "#3a334a",
          color: "#fff",
          padding: 2,
          marginBottom: 2,
          boxShadow: `0 3px 5px 2px rgba(98, 75, 178, .3)`,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" sx={{ color: "#fff" }}>
            {data.username}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#B0A7D5",
              wordWrap: "break-word",
              marginTop: 1.5,
            }}
          >
            {data.password_hash}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Column style={{ padding: "30px 25px", width: "auto" }}>
        <Line
          style={{ width: "100%", justifyContent: "center", paddingBottom: 10 }}
        >
          <Typography sx={{ fontSize: "26px" }}>
            Criar um novo usuário
          </Typography>
        </Line>
        <Column style={{ width: "100%", justifyContent: "center", gap: 20 }}>
          <TextField
            id="outlined-login-input"
            label="Login"
            autoComplete="username"
            style={{ width: "100%" }}
            value={login}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLogin(event.target.value);
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
            style={{ width: "100%" }}
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
          />
        </Column>
        <Line
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0px 15px",
            marginTop: "20px",
          }}
        >
          <Button
            id="accept"
            sx={{
              padding: "0 20px",
              minWidth: "max-content",
              color: "#fff",
              position: "relative",
              height: 30,
              textTransform: "none",
              fontWeight: "bold",
              opacity: 0.8,
              borderWidth: 0,
              backgroundColor: "#41267D",
              "&:hover": {
                backgroundColor: "#624BB2",
                border: "none",
              },
            }}
            onClick={handleSubmit}
          >
            CRIAR
          </Button>
        </Line>
      </Column>
      <Divider />
      <Column style={{ padding: "30px 25px", gap: 20 }}>
        <Typography sx={{ fontSize: "26px" }}>
          Mostrar usuários cadastrados
        </Typography>
        <Line style={{ width: "60%" }}>
          <Button
            id="accept"
            sx={{
              padding: "0 20px",
              width: "100%",
              minWidth: "max-content",
              color: "#fff",
              position: "relative",
              height: 30,
              textTransform: "none",
              fontWeight: "bold",
              opacity: 0.8,
              borderWidth: 0,
              backgroundColor: "#41267D",
              "&:hover": {
                backgroundColor: "#624BB2",
                border: "none",
              },
            }}
            onClick={handleGetUserData}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Gerar relatório"
            )}
          </Button>
        </Line>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          {!loading &&
            data.length > 0 &&
            data.map((el: any) => (
              <Card variant="outlined" style={{ width: "80%" }}>
                {renderCardComponent(el)}
              </Card>
            ))}
        </Box>
      </Column>
    </>
  );
};

export default Collections;
