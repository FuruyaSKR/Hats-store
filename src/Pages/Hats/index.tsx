import React, { useEffect, useState } from "react";
import { Column, Line } from "../../styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  createNewHat,
  getAllCollections,
  getAllHats,
} from "../../services/hatsService";
import { enqueueSnackbar } from "notistack";

type Size = "S" | "M" | "L";

const Hats: React.FC = () => {
  const [hatName, setHatName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [size, setSize] = useState<Size>("M");
  const [collection, setCollection] = useState<number | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      setLoading(true);
      try {
        const response: any = await getAllCollections();
        setOptions(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    if (options.length === 0) {
      authenticateAndFetchData();
    }
  }, [options]);

  const formatValue = (value: string) => {
    value = value.toString();
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/\D/g, "");
    if (inputValue.length > 0) {
      inputValue = parseInt(inputValue, 10).toString();
    }
    setPrice(inputValue);
  };

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Size;
    if (["S", "M", "L"].includes(value)) {
      setSize(value);
    }
  };

  const handleSubmit = async () => {
    const newPayload = {
      nome_chapeu: hatName,
      preco: price,
      tamanho: size,
      cores_disponiveis: ["Padrão"],
      descricao: description,
      collection_id: collection,
      disponivel: true,
    };
    try {
      await createNewHat(newPayload);
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
      const response = await getAllHats();
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
        key={`chapeu-${data.hat_id}`}
        sx={{
          display: "flex",
          flexDirection: "column",
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
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            width: 400,
            borderRadius: 12,
          }}
        >
          <Typography sx={{ fontSize: 14, color: "#ededed" }} gutterBottom>
            ID do Chapéu: {data.hat_id}
          </Typography>

          <Typography variant="h5" component="div" sx={{ color: "#fff" }}>
            {data.nome_chapeu}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#D1C4E9", marginBottom: 1.5 }}
          >
            {data.descricao}
          </Typography>

          <Typography sx={{ color: "#B0A7D5", fontWeight: "bold" }}>
            Preço: R$ {data.preco.toFixed(2)}
          </Typography>

          <Typography sx={{ color: "#B0A7D5" }}>
            Tamanho: {data.tamanho}
          </Typography>

          <Box
            sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 1.5 }}
          >
            {data.cores_disponiveis.map((cor: string, index: number) => (
              <Chip
                key={index}
                label={cor}
                sx={{
                  backgroundColor: "#624BB2",
                  color: "#fff",
                }}
              />
            ))}
          </Box>

          <Typography sx={{ color: "#B0A7D5", marginTop: 1.5 }}>
            Data de Criação: {new Date(data.data_criacao).toLocaleDateString()}
          </Typography>

          <Typography
            sx={{
              color: data.disponivel ? "#8BC34A" : "#F44336",
              fontWeight: "bold",
              marginTop: 1.5,
            }}
          >
            {data.disponivel ? "Disponível" : "Indisponível"}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <Column style={{ padding: "30px 25px", width: "auto" }}>
        <Line
          style={{ width: "100%", justifyContent: "center", paddingBottom: 10 }}
        >
          <Typography sx={{ fontSize: "26px" }}>
            Criar um novo chapéu
          </Typography>
        </Line>
        <Column style={{ width: "100%", justifyContent: "center", gap: 20 }}>
          <TextField
            id="outlined-password-input"
            label="Nome do chapéu"
            autoComplete="current-password"
            style={{ width: "100%" }}
            value={hatName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setHatName(event.target.value);
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
          <Line style={{ gap: 20 }}>
            <TextField
              onChange={handleChange}
              label="Preço"
              value={formatValue(price)}
              autoFocus
              autoComplete="off"
              variant="outlined"
              type="text"
              sx={{
                textAlign: "right",
                width: "40%",
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              select
              label="Tamanho"
              value={size}
              onChange={handleChangeSize}
              variant="outlined"
              sx={{
                width: "60%",
              }}
            >
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="L">L</MenuItem>
            </TextField>
          </Line>
          <TextField
            select
            label="Coleções"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const collection: any = event.target.value;
              setCollection(collection.collection_id);
            }}
            variant="outlined"
            sx={{
              width: "100%",
            }}
            InputProps={{
              endAdornment: loading ? <CircularProgress size={20} /> : null,
            }}
          >
            {!loading && options.length > 0 ? (
              options.map((option: any) => (
                <MenuItem
                  key={`${option.name}-${option.collection_id}`}
                  value={option}
                >
                  {option.nome_colecao}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                Carregando...
              </MenuItem>
            )}
          </TextField>
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
          <Column
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            {!loading &&
              data.length > 0 &&
              data.map((el: any) => <>{renderCardComponent(el)}</>)}
          </Column>
        </Column>
      </Column>
    </div>
  );
};

export default Hats;
