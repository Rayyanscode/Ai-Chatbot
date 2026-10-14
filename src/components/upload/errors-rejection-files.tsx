import { FileRejection } from 'react-dropzone';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// utils
import { fData } from 'src/utils/format-number';
//
import { fileData } from '../file-thumbnail';

// ----------------------------------------------------------------------

function formatRejectionMessage(error: { code: string; message: string }, fileName: string) {
  if (error.code === 'file-too-large') {
    const match = error.message.match(/(\d+)\s*bytes/);
    const maxBytes = match ? Number(match[1]) : null;
    const maxLabel = maxBytes ? fData(maxBytes) : 'the limit';
    return `File exceeds the maximum file size of ${maxLabel}`;
  }
  return error.message;
}

// ----------------------------------------------------------------------

type Props = {
  fileRejections: FileRejection[];
};

export default function RejectionFiles({ fileRejections }: Props) {
  if (!fileRejections.length) {
    return null;
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        textAlign: 'left',
        borderStyle: 'dashed',
        borderColor: 'error.main',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = fileData(file);
        const name = path || file.name;

        return (
          <Box key={name} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {name} - {size ? fData(size) : ''}
            </Typography>

            {errors.map((error) => (
              <Box key={error.code} component="span" sx={{ typography: 'caption' }}>
                - {formatRejectionMessage(error, name)}
              </Box>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
