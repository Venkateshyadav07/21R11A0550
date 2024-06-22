import React from 'react';
import { Box, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';

const FilterBar = ({ setFilters, setSort }) => {
  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <Box display="flex" justifyContent="space-between" mb={3}>
      <TextField label="Product Name" name="productName" onChange={handleFilterChange} />
      <TextField label="Price Range" name="priceRange" onChange={handleFilterChange} />
      <TextField label="Rating" name="rating" onChange={handleFilterChange} />
      <TextField label="Discount" name="discount" onChange={handleFilterChange} />

      <FormControl>
        <InputLabel>Availability</InputLabel>
        <Select name="availability" onChange={handleFilterChange}>
          <MenuItem value="yes">In Stock</MenuItem>
          <MenuItem value="out-of-stock">Out of Stock</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Sort By</InputLabel>
        <Select name="sort" onChange={handleSortChange}>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="discount">Discount</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={() => setFilters({})}>
        Clear Filters
      </Button>
    </Box>
  );
};

export default FilterBar;
