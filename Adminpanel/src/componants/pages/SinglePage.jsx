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

const ViewPage = () => {
  const { id } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/page/getpage/${id}`);
        setPageData(response.data.pageDetails[0]);
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
    <Container maxWidth="md" style={{ marginTop: "100px" }}>
      <Paper
        elevation={4}
        style={{ padding: "30px", backgroundColor: "#f5f5f5" }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "#3f51b5" }}
        >
          Page Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Name:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {pageData.name}
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
                Title:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {pageData.title}
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
                Short Description:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {pageData.short_description}
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
                Description:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {pageData.description}
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
                Category:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {pageData.category}
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
                Cat:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", fontWeight: "500" }}
              >
                {pageData.cat}
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
                Image URL:
              </Typography>
              <img
                src={pageData.image_URL}
                alt={pageData.title}
                style={{
                  maxWidth: "100%",
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
                {pageData.image_URL}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ViewPage;
