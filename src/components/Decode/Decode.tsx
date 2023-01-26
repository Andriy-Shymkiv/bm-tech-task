/* eslint-disable no-console */
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useState } from 'react';
import { styles } from '../../styles/muiStyles/styles';

export const Decode: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleCodeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) {
      setInputCode(e.target.value);
    }
  };

  const handleDecode = () => {
    const textAfterDecode = [];

    for (let i = 0; i < inputCode.length; i += 2) {
      textAfterDecode.push(+inputCode.substring(i, i + 2));
    }

    const decoded = String.fromCharCode(...textAfterDecode);

    setDecodedText(decoded);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.convertWrapper}>
        <TextField
          type="text"
          variant="standard"
          sx={styles.textField}
          placeholder="Code"
          multiline
          rows={15}
          value={inputCode}
          onChange={handleCodeArea}
          InputProps={{
            disableUnderline: true,
            style: {
              margin: '14px',
            },
          }}
        />
        <Box sx={styles.options}>
          <TextField
            type="number"
            variant="standard"
            sx={styles.optionsField}
            placeholder="Shift"
            disabled
            InputProps={{
              disableUnderline: true,
              style: {
                margin: '14px',
              },
            }}
          />
          <TextField
            type="number"
            variant="standard"
            sx={styles.optionsField}
            placeholder="Number of repeats"
            disabled
            InputProps={{
              disableUnderline: true,
              style: {
                margin: '14px',
              },
            }}
          />
        </Box>
        <Button
          sx={styles.convertButton}
          variant="contained"
          onClick={handleDecode}
        >
          Decode this text
        </Button>
      </Box>
      <Box sx={styles.resultsWrapper}>
        <h2>Result</h2>
        <Box sx={{ flex: '1', marginBottom: '32px' }}>
          {decodedText}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Button
            // onClick={handleCopyClick}
            sx={styles.resultsButton}
            variant="outlined"
          >
            <FileCopyIcon fontSize="small" />
            Copy to clickboard
          </Button>
          <Button
            // onClick={handleShowAllClick}
            sx={styles.resultsButton}
            variant="outlined"
          >
            <OpenInFullIcon fontSize="small" />
            Show the full result
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
