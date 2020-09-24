import React from 'react'
import {
  Grid,
  Select,
  FormControlLabel,
  MenuItem,
  Checkbox,
  createStyles,
  withStyles,
} from '@material-ui/core'

const filterStyles = theme =>
  createStyles({
    orderBySelect: {
      marginLeft: theme.spacing.unit,
    },
  })

const Filter = ({
  classes,
  onToggleWithName,
  onToggleWithPassportNum,
  onToggleWithDesignation,
  onOrderBy,
  withName,
  withPassportNum,
  withDesignation,
  orderBy,
}) => (
  <Grid item>
    <Grid container direction="row">
      <FormControlLabel
        control={
          <Checkbox
            checked={withName}
            onChange={event => onToggleWithName && onToggleWithName()}
          />
        }
        label="With names"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={withPassportNum}
            onChange={event => onToggleWithPassportNum && onToggleWithPassportNum()}
          />
        }
        label="With passport num"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={withDesignation}
            onChange={event => onToggleWithDesignation && onToggleWithDesignation()}
          />
        }
        label="With designations"
      />
      <FormControlLabel
        control={
          <Select
            className={classes.orderBySelect}
            value={orderBy}
            onChange={event => onOrderBy && onOrderBy(event.target.value)}
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="referenceNum">Reference Num</MenuItem>
            <MenuItem value="nationality">Nationality</MenuItem>
          </Select>
        }
        label="Order By:"
        labelPlacement="start"
      />
    </Grid>
  </Grid>
)

const StyledFilter = withStyles(filterStyles)(Filter)

export default StyledFilter
