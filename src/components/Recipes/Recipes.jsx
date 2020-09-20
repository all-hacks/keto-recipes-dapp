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

const recipeStyles = theme =>
  createStyles({
    actionArea: {
      maxWidth: 300,
    },
    image: {
      height: 150,
    },
    displayName: {
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
    ingredients: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })

const Recipe = ({ classes, id, displayName, imageUrl, owner, ingredients, steps }) => (
  <Grid item>
    <Card>
      <CardActionArea className={classes.actionArea}>
        {imageUrl && (
          <CardMedia className={classes.image} image={"https://spoonacular.com/recipeImages/" + imageUrl} title={displayName + "  Steps: " + steps.join(' | ')} />
        )}
        <CardContent>
          <Typography variant="h6" component="h3" className={classes.displayName}>
            {displayName || '—'}
          </Typography>
          <Typography color="textSecondary">ID</Typography>
          <Typography component="p" className={classes.id}>
            {id}
          </Typography>
          <Typography color="textSecondary">Owner</Typography>
          <Typography component="p" className={classes.owner}>
            {owner}
          </Typography>
          <Typography color="textSecondary">Ingredients</Typography>
          <Typography component="p" className={classes.ingredients}>
            {ingredients.join(', ')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const StyledRecipe = withStyles(recipeStyles)(Recipe)

const recipesStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
    },
  })

const Recipes = ({ classes, recipes }) => (
  <Grid container direction="column" spacing={16}>
    <Grid item>
      <Typography variant="title" className={classes.title}>
        {recipes.length} Recipes
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {recipes.map(recipe => (
          <StyledRecipe key={recipe.id} {...recipe} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(recipesStyles)(Recipes)
