import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
 

const ButtonAdd = ( props ) => {
    const {variant,color,onClick,labelButton,style,icon} = props;
  return (
    <Button 
    variant={variant}
    color={color}
    onClick={onClick}
    style={style}
    startIcon={<AddIcon />}
    >
   {labelButton}
  </Button>
  )
}

export default ButtonAdd