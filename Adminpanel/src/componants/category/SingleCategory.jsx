import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../../utils/intercepter";

const ViewCategory = () => {
  const { id } = useParams();
  const [cateData, setCateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/category/catebyid/${id}`);
        console.log(response.data.catDetails[0]);
        setCateData(response.data.catDetails[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" style={{ marginTop: "100px" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" style={{ marginTop: "100px" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container width="1" style={{ width: "100%" }}>
      <Paper
        elevation={0}
        style={{ backgroundColor: "transparent" }} // Set background color to transparent
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "#3f51b5", marginBottom: "40px" }}
        >
          Category Details
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ border: "1px solid black", borderRadius: "6px" }}
        >
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Title:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {cateData.title}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                each_sub:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {cateData.each_sub}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                category_URL:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {cateData.category_URL}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                description:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {cateData.description}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" flexDirection="column">
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Image:
              </Typography>
              <img
                src={cateData.image}
                alt={cateData.title}
                style={{
                  maxWidth: "8rem",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
              <Typography
                variant="body1"
                style={{
                  marginTop: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                {cateData.image}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ViewCategory;
