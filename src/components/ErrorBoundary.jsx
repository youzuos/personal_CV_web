import { Component } from 'react'

// Catches render-time errors in its subtree so a thrown exception in a
// lazy-loaded section (AIAnswer, ContactForm) doesn't blank the whole page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <section className="py-12 px-6">
          <div className="max-w-md mx-auto glass-card p-6 text-center">
            <p className="text-slate-300 text-sm">
              This section failed to load. Please refresh to try again.
            </p>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
