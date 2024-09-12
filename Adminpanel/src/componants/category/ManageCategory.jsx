import { useState } from "react";
import { TextField, Button, Grid, Typography, MenuItem } from "@mui/material";
import api from "../../utils/intercepter";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    each_sub: "",
    category_URL: "",
    description: "",
    image: "",
  });

  api.get("/category/categories").then((info) => setCategories(info.data.data));

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    try {
      api.post("/category/createcategory", formData);

      setFormData({
        title: "",
        each_sub: "",
        category_URL: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Each-Sub"
              name="each_sub"
              value={formData.each_sub}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.category_URL}>
                  {option.category_URL}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category URL"
              name="category_URL"
              value={formData.category_URL}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          {/* ------------ isParent ---------------- */}

          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="isParent"
              name="isParent"
              value={formData.isParent}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.title}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* ------------ isParent ---------------- */}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ height: "50px" }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ManageCategory;
