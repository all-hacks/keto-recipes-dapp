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
import Sanctions from './components/Sanctions'
import Filter from './components/Filter'

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

const SANCTIONS_QUERY = gql`
  query sanctions($where: Sanction_filter!, $orderBy: Sanction_orderBy!) {
    sanctions(first: 50, where: $where, orderBy: $orderBy, orderDirection: asc) {
      id
      owner
      referenceNum
      name
      nationality
      passportNum
      designation
    }
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      withName: false,
      withPassportNum: false,
      withDesignation: false,
      orderBy: 'referenceNum',
      showHelpDialog: false,
      searchCountry: "",
      searchName: ""
    }
  }

  toggleHelpDialog = () => {
    this.setState(state => ({ ...state, showHelpDialog: !state.showHelpDialog }))
  }

  gotoQuickStartGuide = () => {
    window.location.href = 'https://thegraph.com/docs/quick-start'
  }

  render() {
    const { withName, withPassportNum, withDesignation, orderBy, showHelpDialog, searchCountry, searchName } = this.state

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Grid container direction="column">
            <Header onHelp={this.toggleHelpDialog} />
            <Filter
              searchCountry={searchCountry}
              searchName={searchName}
              orderBy={orderBy}
              withName={withName}
              withPassportNum={withPassportNum}
              withDesignation={withDesignation}
              onSearchCountry={field => this.setState(state => ({ ...state, searchCountry: field }))}
              onSearchName={field => this.setState(state => ({ ...state, searchName: field }))}
              onOrderBy={field => this.setState(state => ({ ...state, orderBy: field }))}
              onToggleWithName={() =>
                this.setState(state => ({ ...state, withName: !state.withName }))
              }
              onToggleWithPassportNum={() =>
                this.setState(state => ({ ...state, withPassportNum: !state.withPassportNum }))
              }
              onToggleWithDesignation={() =>
                this.setState(state => ({ ...state, withDesignation: !state.withDesignation }))
              }
            />
            <Grid item>
              <Grid container>
                <Query
                  query={SANCTIONS_QUERY}
                  variables={{
                    where: {
                      ...({ nationality_contains: searchCountry ?  searchCountry : "", 
                          name_contains: searchName ?  [searchName] : [] }),
                      ...(withName ? { name_not: [] } : {}),
                      ...(withPassportNum ? { passportNum_not: [] } : {}),
                      ...(withDesignation ? { designation_not: [] } : {}),
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
                      <Sanctions sanctions={data.sanctions} />
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
