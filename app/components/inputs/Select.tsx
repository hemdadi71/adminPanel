'use client'

import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface SelectProps {
  defaultValue?: string
  id: string
  register: UseFormRegister<FieldValues>
}

export const SelectInput: React.FC<SelectProps> = ({
  defaultValue,
  id,
  register,
}) => {
  const [role, setRole] = React.useState(defaultValue)

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value)
  }

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Role:
      </label>
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': {
            border: 1,
            borderColor: '#D1D5DB',
          },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 1,
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              border: 1,
            },
        }}>
        <Select
          style={{
            background: 'white',
            height: '37px',
          }}
          {...register(id, { required: true })}
          value={role}
          id={id}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value="admin">admin</MenuItem>
          <MenuItem value="user">user</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
