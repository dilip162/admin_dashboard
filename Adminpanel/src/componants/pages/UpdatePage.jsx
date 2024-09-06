import { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/intercepter";

const UpdatePage = () => {
  const { id } = useParams();
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

  // Fetching the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/page/getpage/${id}`);
        setFormValues(response.data.pageDetails[0]);
        console.log(response.data.pageDetails[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image_URL") {
      const file = e.target.files[0];
      if (file) {
        const imageUrl =
          URL.createObjectURL(file) ||
          "https://cdn-icons-png.flaticon.com/512/5556/5556499.png";
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
    try {
      const response = await api.put(`/page/updatepage/${id}`, formValues);

      setResponseMessage("Data updated successfully!");
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
    } catch (error) {
      setResponseMessage("Failed to update data.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Update Page
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
            <input type="file" name="image_URL" onChange={handleInputChange} />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default UpdatePage;
