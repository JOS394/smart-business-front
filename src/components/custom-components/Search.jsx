import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ( props ) => {
    const {variant,label,value,onChange} = props 

      return (
        <TextField 
        variant={variant} 
        label={label}
        value={value} 
        onChange={onChange}
        fullWidth
        style={{ margin: '20px 0',width:'25%'}} 
        InputProps={{
            endAdornment: (
                <SearchIcon />
            )
        }}
        />
    )
  }

export default SearchInput