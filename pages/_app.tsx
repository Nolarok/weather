import React from 'react'
import { Provider } from 'react-redux'
import App, { AppContext } from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import makeStore from '@/store'
import '@/styles/main.scss'
import { StylesProvider } from '@material-ui/core/styles'

type Props = {
  store: any
}

export const store = makeStore()

class NewApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render(): React.ReactElement {
    const { Component, pageProps, store } = this.props

    return (
      <Provider store={store}>
        <StylesProvider>
          <Component {...pageProps} />
        </StylesProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(withReduxSaga(NewApp))
