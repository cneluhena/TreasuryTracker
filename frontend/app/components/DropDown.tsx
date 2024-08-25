import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react";


interface Props{
    menuName: string ,
    menuItems: string[],
    onSelectChange :(selectedValue:string)=>void
}

const DropDown = ({menuName, menuItems, onSelectChange}:Props)=>{
    const [menu, setMenu] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setMenu(event.target.value);
        onSelectChange(event.target.value);
    };
    return (
        <FormControl sx={{ m: 1, minWidth: '25%' }} size="small">
        <InputLabel id="demo-select-small-label">{menuName}</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={menu}
          label={menuName}
          onChange={handleChange}
      
        >
            
                {  menuItems.map((item, key)=>(
                        <MenuItem key={key} value={item}>{item}</MenuItem>
                    ))
                    }
        </Select>
      </FormControl>
    )
}

export default DropDown;