import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  createStyles,
  withStyles,
} from '@material-ui/core'

const sanctionStyles = theme =>
  createStyles({
    actionArea: {
      maxWidth: 300,
    },
    image: {
      height: 150,
    },
    name: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    id: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    owner: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    passportNum: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    designation: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    referenceNum: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    nationality: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })

const Sanction = ({ classes, id, name, owner, referenceNum, nationality, passportNum, designation }) => (
  <Grid item>
    <Card>
      <CardActionArea className={classes.actionArea}>
        <CardContent>
          <Typography variant="h6" component="h3" className={classes.referenceNum}>
            {referenceNum}
          </Typography>
          <Typography color="textSecondary">ID</Typography>
          <Typography component="p" className={classes.id}>
            {id}
          </Typography>
          <Typography color="textSecondary">Name</Typography>
          <Typography component="p" className={classes.name}>
            {name.join(', ') || '—'}
          </Typography>
          <Typography color="textSecondary">Nationality</Typography>
          <Typography component="p" className={classes.nationality}>
            {nationality || '-' }
          </Typography>
          <Typography color="textSecondary">Passport</Typography>
          <Typography component="p" className={classes.passportNum}>
            {passportNum.join(', ') || '-' }
          </Typography>
          <Typography color="textSecondary">Designation</Typography>
          <Typography component="p" className={classes.designation}>
            {designation.join(', ') || '-' }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const StyledSanction = withStyles(sanctionStyles)(Sanction)

const sanctionsStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
    },
  })

const Sanctions = ({ classes, sanctions }) => (
  <Grid container direction="column" spacing={16}>
    <Grid item>
      <Typography variant="title" className={classes.title}>
        {sanctions.length} Sanctions
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {sanctions.map(sanction => (
          <StyledSanction key={sanction.id} {...sanction} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(sanctionsStyles)(Sanctions)
