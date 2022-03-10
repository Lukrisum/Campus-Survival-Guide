import React from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Fade } from '@mui/material';
import { useEffect, useState } from "react";

export default function Alert_info_box() {
  const [fadeController, setFadeController] = useState({
    fadeIn: true,
    fadeTime: 500
  });

  useEffect(() => {
    setTimeout(() => {
      setFadeController({
        fadeIn: false,
        fadeTime: 2000,
      })
    }, 2000);
  }, [])

  return (
    <Fade
      in={fadeController.fadeIn}
      timeout={fadeController.fadeTime}
    >
      <div >
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert
            variant="filled"
            severity="info"
            style={{
              lineHeight: '160%',
              height: '120%',
              backgroundColor: 'rgba(109,196,250)'
            }}
          >
            暂时没有数据
          </Alert>
        </Stack>
      </div>
    </Fade>

  )

}

export function Alert_error_box(props) {

  const [fadeController, setFadeController] = useState({
    fadeIn: true,
    fadeTime: 500
  });

  useEffect(() => {
    setTimeout(() => {
      setFadeController({
        fadeIn: false,
        fadeTime: 2000,
      })
    }, 2000);
  }, [])

  return (
    <Fade
      in={fadeController.fadeIn}
      timeout={fadeController.fadeTime}
    >
      <div style={{ position: "fixed", top: '5.7rem' }}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert
            variant="filled"
            severity="error"
            style={{
              lineHeight: '160%',
              height: '120%',
              backgroundColor: 'rgba(238,0,0,.5)'
            }}
          >
            {props?.errMsg}
          </Alert>
        </Stack>
      </div>
    </Fade>

  )
}

// export function Alert_waring_box(){

// }

// export function Alert_success_box(){

// }
