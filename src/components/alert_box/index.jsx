import React from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Fade } from '@mui/material';
import { useEffect,useState } from "react";

export default function Alert_box() {
  const [fadeController,setFadeController] = useState({
    fadeIn:true,
    fadeTime:500
  });

  useEffect(()=>{
    setTimeout(() => {
      setFadeController({
        fadeIn:false,
        fadeTime:2000,
      })
    }, 2000);
  },[])

  return (
    <Fade
      in={fadeController.fadeIn}
      timeout={fadeController.fadeTime}
    >
      <div >
        <Stack>
          <Alert variant="filled" severity="info" style={{
            backgroundColor:"rgb(101,189,252)"
          }}>
            暂时没有数据
          </Alert>
        </Stack>
      </div>
    </Fade>

  )
}
