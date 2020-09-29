import React from 'react'
import {
  Grid,
  Select,
  FormControlLabel,
  MenuItem,
  Checkbox,
  TextField,
  createStyles,
  withStyles,
} from '@material-ui/core'

const filterStyles = theme =>
  createStyles({
    orderBySelect: {
      marginLeft: theme.spacing.unit,
    },
    searchCountry: {
      marginLeft: theme.spacing.unit,
    },
    searchName: {
      marginLeft: theme.spacing.unit,
    },
  })

const Filter = ({
  classes,
  onToggleWithName,
  onToggleWithPassportNum,
  onToggleWithDesignation,
  onOrderBy,
  onSearchCountry,
  onSearchName,
  withName,
  withPassportNum,
  withDesignation,
  searchCountry,
  searchName,
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
    <Grid container direction="row">
      <FormControlLabel
        control={
          <TextField 
            value={searchCountry}
            className={classes.searchCountry}
            onChange={event => onSearchCountry && onSearchCountry(event.target.value)}
          />
        }
        label="Search country"
      />
      <FormControlLabel
        control={
          <TextField 
            value={searchName}
            className={classes.searchName}
            onChange={event => onSearchName && onSearchName(event.target.value)}
          />
        }
        label="Search name"
      />
    </Grid>
  </Grid>
)

const StyledFilter = withStyles(filterStyles)(Filter)

export default StyledFilter
