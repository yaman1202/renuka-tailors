import { Component, type ErrorInfo, type ReactNode } from 'react'

type State = { failed: boolean }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State { return { failed: true } }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Renuka Tailors page rendering failed.', error, info.componentStack)
  }

  render() {
    if (this.state.failed) return <main className="simple-page"><section className="page-intro"><p className="eyebrow">RENUKA TAILORS · MEERUT</p><h1>We couldn’t load this page.</h1><p>Please return to the homepage and try again.</p><a className="button button-primary" href="/">Return home</a></section></main>
    return this.props.children
  }
}
