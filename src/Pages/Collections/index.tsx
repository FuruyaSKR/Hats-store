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
import { format } from "date-fns";
import {
  createNewCollection,
  getAllCollection,
} from "../../services/collectionsService";
import { enqueueSnackbar } from "notistack";

const Users: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [collectionName, setCollectionName] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    const newPayload = {
      nome_colecao: collectionName,
      descricao: description,
      data_criacao: formattedDate,
      disponivel: true,
    };
    try {
      await createNewCollection(newPayload);
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
      const response = await getAllCollection();
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
          display: "flex",
          alignItems: "center",
          backgroundColor: "#3a334a",
          color: "#fff",
          borderRadius: 2,
          padding: 2,
          marginBottom: 2,
          boxShadow: `0 3px 5px 2px rgba(98, 75, 178, .3)`,
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            borderRadius: 12,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#ededed",
            }}
            gutterBottom
          >
            ID da Coleção: {data.collection_id}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "#fff",
            }}
          >
            {data.nome_colecao}
          </Typography>
          <Typography
            sx={{
              mb: 1.5,
              color: "#B0A7D5",
            }}
          >
            Data de Criação: {new Date(data.data_criacao).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#D1C4E9",
            }}
          >
            {data.descricao}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Column style={{ padding: "30px 25px", width: "auto", height: "100%" }}>
        <Line
          style={{ width: "100%", justifyContent: "center", paddingBottom: 10 }}
        >
          <Typography sx={{ fontSize: "26px" }}>
            Criar uma nova coleção
          </Typography>
        </Line>
        <Column style={{ width: "100%", justifyContent: "center", gap: 20 }}>
          <TextField
            id="outlined-password-input"
            label="Nome da coleção"
            autoComplete="current-password"
            style={{ width: "100%" }}
            value={collectionName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCollectionName(event.target.value);
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Descrição"
            autoComplete="current-password"
            style={{ width: "100%" }}
            value={description}
            multiline
            rows={3}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value);
            }}
          />
        </Column>
        <Line
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0px 15px",
            marginTop: "15px",
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
        <Divider />
        <Column style={{ padding: "30px 25px", gap: 20 }}>
          <Typography sx={{ fontSize: "26px" }}>
            Mostrar coleções cadastradas
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
      </Column>
    </>
  );
};

export default Users;
