import React from 'react';
import mod from './index.module.scss'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    fontFamily: 'YouYuan',
    fontSize: '3rem',
  }
})

export default function FabMine(props) {
  const classes = useStyles();
  return (
    <div className={mod.fab_wrapper} onClick={props.onclick}>
      <AddIcon className={classes.root} />
    </div>
  )
}
