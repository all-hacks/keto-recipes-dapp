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
  onToggleWithImage,
  onToggleWithSteps,
  onToggleWithIngredients,
  onOrderBy,
  withName,
  withImage,
  withSteps,
  withIngredients,
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
            checked={withImage}
            onChange={event => onToggleWithImage && onToggleWithImage()}
          />
        }
        label="With images"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={withSteps}
            onChange={event => onToggleWithSteps && onToggleWithSteps()}
          />
        }
        label="With instructions"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={withIngredients}
            onChange={event => onToggleWithIngredients && onToggleWithIngredients()}
          />
        }
        label="With ingredients"
      />
      <FormControlLabel
        control={
          <Select
            className={classes.orderBySelect}
            value={orderBy}
            onChange={event => onOrderBy && onOrderBy(event.target.value)}
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="imageUrl">Image</MenuItem>
            <MenuItem value="displayName">Name</MenuItem>
            <MenuItem value="owner">Owner</MenuItem>
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
