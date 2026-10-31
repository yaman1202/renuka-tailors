import { Component, type ErrorInfo, type ReactNode } from 'react'

type State = { failed: boolean }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State { return { failed: true } }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Renuka Tailors page rendering failed.', error, info.componentStack)
  }

  render() {
    if (this.state.failed) return <main className="route-placeholder"><p className="eyebrow">RENuka TAILORS · MEERUT</p><h1>We’re preparing<br /><em>this page.</em></h1><p>Please return to the homepage and try again.</p><a className="button button-dark" href="/">Return home</a></main>
    return this.props.children
  }
}
