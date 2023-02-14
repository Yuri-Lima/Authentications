import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function Dropdown() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Approval
        </InputLabel>
        <NativeSelect
          defaultValue={v1}
          inputProps={{
            name: 'approval',
            id: 'approval',
          }}
        >
          <option value={v1}>Approved</option>
          <option value={v2}>Pending</option>
          <option value={v3}>Denied</option>
          <option value={v4}>Terminated</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}