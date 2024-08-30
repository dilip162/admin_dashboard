import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useState } from "react";
import api from "../../utils/intercepter";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
    short_description: "",
    description: "",
    category: "",
    cat: "",
    image_URL: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image_URL") {
      const file = e.target.files[0];
      console.log(file);
      if (file) {
        const imageUrl = URL.createObjectURL(file);

        setFormValues({
          ...formValues,
          [name]: imageUrl,
        });
      }
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);

    try {
      const response = await api.post("/page/createpage", formValues);

      setResponseMessage("Data posted successfully!");
      setTimeout(() => {
        navigate("/admin/pages/view");
      }, 5000);

      setFormValues({
        name: "",
        title: "",
        short_description: "",
        description: "",
        category: "",
        cat: "",
        image_URL: "",
      });
      console.log("Response:", response.data);
      console.log(responseMessage);
    } catch (error) {
      setResponseMessage("Failed to post data.");
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "100px" }}>
      <Typography variant="h4" gutterBottom>
        Add Page
      </Typography>

      {responseMessage && (
        <Typography
          variant="body1"
          color="secondary"
          style={{ marginTop: "20px", fontSize: "30px" }}
        >
          {responseMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Description"
              name="short_description"
              value={formValues.short_description}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={2}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cat"
              name="cat"
              value={formValues.cat}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="" style={{ margin: "0 10px", color: "gray" }}>
              Image URL
            </label>
            <input
              type="file"
              name="image_URL"
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddPage;
