// components/CustomLoadingButton.tsx

import React from 'react';
import { LoadingButton } from '@mui/lab';
import { SxProps, Theme } from '@mui/material';

interface CustomLoadingButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const CustomLoadingButton: React.FC<CustomLoadingButtonProps> = ({
  loading = false,
  disabled = false,
  onClick,
  children,
  sx = {},
  fullWidth,
  type = 'button',
  variant = 'contained',
  startIcon,
  endIcon,
}) => (
  <LoadingButton
    fullWidth={fullWidth}
    loading={loading}
    disabled={disabled}
    onClick={onClick}
    type={type}
    variant={variant}
    startIcon={startIcon}
    endIcon={endIcon}
    sx={{
      backgroundColor: '#CFAB57',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#CFAB57',
      },
      ...sx,
    }}
  >
    {children}
  </LoadingButton>
);

export default CustomLoadingButton;
