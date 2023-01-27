import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabsList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import { Tabs } from '@mui/material';
import { useState } from 'react';
import { Encode } from '../Encode';
import { Decode } from '../Decode';

export const Content: React.FC = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const contentStyles = {
    main: {
      backgroundColor: '#fff',
      borderRadius: '0px 12px 12px 12px',
    },
    tab: {
      textTransform: 'none',
      backgroundColor: '#fff',
      border: '1px solid transparent',
      borderRadius: '12px 12px 0 0',
    },
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabsList onChange={handleChange} aria-label="tabs">
            <Tab label="Encode" value="1" sx={contentStyles.tab} />
            <Tab label="Decode" value="2" sx={contentStyles.tab} />
          </TabsList>
        </Box>
        <Box sx={contentStyles.main}>
          <TabPanel value="1">
            <Encode />
          </TabPanel>
          <TabPanel value="2">
            <Decode />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};
