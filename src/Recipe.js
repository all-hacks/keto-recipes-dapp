import React, { Component } from 'react'
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import {
  Grid,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core'
import './App.css'
import Header from './components/Header'
import Error from './components/Error'
import Gravatars from './components/Gravatars'
import Recipes from './components/Recipes'
import Filter from './components/Filter'

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

const GRAVATARS_QUERY = gql`
  query gravatars($where: Gravatar_filter!, $orderBy: Gravatar_orderBy!) {
    gravatars(first: 10, where: $where, orderBy: $orderBy, orderDirection: asc) {
      id
      owner
      displayName
      imageUrl
    }
  }
`

const RECIPES_QUERY = gql`
  query recipes($where: Recipe_filter!, $orderBy: Recipe_orderBy!) {
    recipes(first: 10, where: $where, orderBy: $orderBy, orderDirection: asc) {
      id
      owner
      displayName
      imageUrl
      ingredients
      steps
    }
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      withImage: false,
      withName: false,
      withSteps: false,
      withIngredients: false,
      orderBy: 'displayName',
      showHelpDialog: false,
    }
  }

  toggleHelpDialog = () => {
    this.setState(state => ({ ...state, showHelpDialog: !state.showHelpDialog }))
  }

  gotoQuickStartGuide = () => {
    window.location.href = 'https://thegraph.com/docs/quick-start'
  }

  render() {
    const { withImage, withName, withSteps, withIngredients, orderBy, showHelpDialog } = this.state

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Grid container direction="column">
            <Header onHelp={this.toggleHelpDialog} />
            <Filter
              orderBy={orderBy}
              withImage={withImage}
              withName={withName}
              withSteps={withSteps}
              withIngredients={withIngredients}
              onOrderBy={field => this.setState(state => ({ ...state, orderBy: field }))}
              onToggleWithImage={() =>
                this.setState(state => ({ ...state, withImage: !state.withImage }))
              }
              onToggleWithName={() =>
                this.setState(state => ({ ...state, withName: !state.withName }))
              }
              onToggleWithSteps={() =>
                this.setState(state => ({ ...state, withSteps: !state.withSteps }))
              }
              onToggleWithIngredients={() =>
                this.setState(state => ({ ...state, withIngredients: !state.withIngredients }))
              }
            />
            <Grid item>
              <Grid container>
                <Query
                  query={RECIPES_QUERY}
                  variables={{
                    where: {
                      ...(withImage ? { imageUrl_not: '' } : {}),
                      ...(withName ? { displayName_not: '' } : {}),
                      ...(withSteps ? { steps_not: [] } : {}),
                      ...(withIngredients ? { ingredients_not: [] } : {}),
                    },
                    orderBy: orderBy,
                  }}
                >
                  {({ data, error, loading }) => {
                    return loading ? (
                      <LinearProgress variant="query" style={{ width: '100%' }} />
                    ) : error ? (
                      <Error error={error} />
                    ) : (
                      <Recipes recipes={data.recipes} />
                    )
                  }}
                </Query>
              </Grid>
            </Grid>
          </Grid>
          <Dialog
            fullScreen={false}
            open={showHelpDialog}
            onClose={this.toggleHelpDialog}
            aria-labelledby="help-dialog"
          >
            <DialogTitle id="help-dialog">{'Show Quick Guide?'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                We have prepared a quick guide for you to get started with The Graph at
                this hackathon. Shall we take you there now?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleHelpDialog} color="primary">
                Nah, I'm good
              </Button>
              <Button onClick={this.gotoQuickStartGuide} color="primary" autoFocus>
                Yes, pease
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
