import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Button, MenuItem } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useState } from 'react';
import { styles } from '../../styles/muiStyles/styles';

export const Decode: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [fullDecodedText, setFullDecodedText] = useState('');
  const [showFullText, setShowFullText] = useState(false);
  const [unshift, setUnshift] = useState<number>();
  const [repeats, setRepeats] = useState<number>();

  const handleCodeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) {
      setInputCode(e.target.value);
    }
  };

  const handleDecode = () => {
    let textAfterDecode = [];

    for (let i = 0; i < inputCode.length; i += 2) {
      textAfterDecode.push(+inputCode.substring(i, i + 2));
    }

    if (unshift) {
      textAfterDecode = textAfterDecode.map(number => number - unshift);
    }

    if (repeats) {
      textAfterDecode = textAfterDecode
        .slice(0, textAfterDecode.length / repeats);
    }

    const decoded = String.fromCharCode(...textAfterDecode);

    if (decoded.length > 400) {
      const cuttedDecoded = `${decoded.slice(0, 720)} ...`;

      setDecodedText(cuttedDecoded);
    } else {
      setDecodedText(decoded);
    }

    setFullDecodedText(decoded);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(fullDecodedText);
  };

  const handleShowAllClick = () => {
    setShowFullText(true);
  };

  const selectShift = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const selectRepeats = [0, 1, 2, 3, 4, 5];

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
            select
            defaultValue={selectShift[0]}
            variant="standard"
            sx={styles.optionsField}
            placeholder="Shift"
            helperText="Please enter unshift count"
            value={unshift}
            onChange={(e) => setUnshift(+e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: {
                margin: '14px',
              },
            }}
          >
            {selectShift.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            defaultValue={selectRepeats[0]}
            variant="standard"
            sx={styles.optionsField}
            placeholder="Number of repeats"
            helperText="Please enter the number of repeats back"
            value={repeats}
            onChange={(e) => setRepeats(+e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: {
                margin: '14px',
              },
            }}
          >
            {selectRepeats.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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
        <Box
          sx={{ flex: '1', marginBottom: '32px' }}
        >
          {!showFullText && decodedText}
          {showFullText && fullDecodedText}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Button
            onClick={handleCopyClick}
            sx={styles.resultsButton}
            variant="outlined"
          >
            <FileCopyIcon fontSize="small" />
            Copy to clickboard
          </Button>
          <Button
            onClick={handleShowAllClick}
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
