import React from 'react'
import { Grid, Typography, IconButton } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'

const Header = ({ onHelp }) => (
  <Grid container direction="row" alignItems="center" spacing={16}>
    <Grid item>
      <Typography variant="title">The Sanction List dApp</Typography>
    </Grid>
  </Grid>
)

export default Header
