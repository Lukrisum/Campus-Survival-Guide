import React from "react";
import { useLocation } from "react-router";
import Alert_info_box from "../../../../components/alert_box";
import mod from "./index.module.scss"

export default function Picture() {
  const location = useLocation();

  return (
    <div className={mod.alert_box_wrapper}>
      <Alert_info_box />
    </div>
  )
}
