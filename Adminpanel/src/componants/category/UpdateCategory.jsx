import { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/intercepter";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    each_sub: "",
    category_URL: "",
    image: "",
    description: "",
  });

  // Fetching the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/category/catebyid/${id}`);
        setFormValues(response.data.catDetails[0]);
        console.log(response.data.catDetails[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        const image = URL.createObjectURL(file);
        setFormValues({
          ...formValues,
          [name]: image,
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
      const response = await api.put(
        `/category/updatecategory/${id}`,
        formValues
      );

      setResponseMessage("Data updated successfully!");
      setTimeout(() => {
        navigate("/admin/category/view");
      }, 5000);
      setFormValues({
        title: "",
        each_sub: "",
        category_URL: "",
        image: "",
        description: "",
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
        Update Category
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
              label="title"
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
              label="each_sub"
              name="each_sub"
              value={formValues.each_sub}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="category_URL"
              name="category_URL"
              value={formValues.category_URL}
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
              label="description"
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
            <label htmlFor="" style={{ margin: "0 10px", color: "gray" }}>
              Image
            </label>
            <input type="file" name="image" onChange={handleInputChange} />
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

export default UpdateCategory;
