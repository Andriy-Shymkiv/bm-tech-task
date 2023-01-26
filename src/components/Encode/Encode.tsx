import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Button, MenuItem } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useState } from 'react';
import { styles } from '../../styles/muiStyles/styles';

export const Encode: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState<number[]>([]);
  const [fullEncodedText, setFullEncodedText] = useState<number[]>([]);
  const [showFullText, setShowFullText] = useState(false);
  const [shift, setShift] = useState<number>();
  const [repeats, setRepeats] = useState<number>();

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^A-Za-z0-9]/g, '_');

    if (val === val.toUpperCase() && val.length <= 256 && !/\d/.test(val)) {
      setInputText(val);
    }
  };

  const handleEncode = () => {
    const encoder = new TextEncoder();
    let encoded = encoder.encode(inputText);

    // apply shift
    if (shift) {
      encoded = encoded.map((n) => n + shift);
    }

    // repeat the encoded text
    if (repeats) {
      const repeatedEncoded = new Uint8Array(encoded.length * repeats);

      for (let i = 0; i < repeats; i += 1) {
        repeatedEncoded.set(encoded, i * encoded.length);
      }

      encoded = repeatedEncoded;
    }

    const result = Array.from(encoded);

    if (result.length > 400) {
      const newResult = result.slice(0, 380);

      setEncodedText(newResult);
    } else {
      setEncodedText(result);
    }

    setFullEncodedText(result);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(fullEncodedText.join(''));
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
          variant="standard"
          sx={styles.textField}
          placeholder="Text"
          multiline
          rows={15}
          value={inputText}
          onChange={handleText}
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
            helperText="Please enter shift count"
            value={shift}
            onChange={(e) => setShift(+e.target.value)}
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
            helperText="Please enter the number of repeats"
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
          onClick={handleEncode}
        >
          Encode this text
        </Button>
      </Box>
      <Box sx={styles.resultsWrapper}>
        <h2>Result</h2>
        <Box sx={{ flex: '1', marginBottom: '32px' }}>
          {!showFullText && (
            <div>
              {encodedText.map((number) => (
                <span>{number}</span>
              ))}
            </div>
          )}
          {showFullText && (
            <div>
              {fullEncodedText.map((number) => (
                <span>{number}</span>
              ))}
            </div>
          )}
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
