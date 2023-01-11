import React,{Fragment} from "react";
import { useSnackbar } from "notistack";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function useErrorSnackbar() {
  const { enqueueSnackbar,closeSnackbar } = useSnackbar();

  const showErrorSnackBar = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
      // action: (key) => (
      //   console.log(key)
      // ),
    });
  };

  return (message: string) => {
    showErrorSnackBar(message);
  };
}
