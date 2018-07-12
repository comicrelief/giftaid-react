import { Component } from 'react';
import { withRouter } from 'react-router-dom';

/**
 * ScrollToTop class
 */
class ScrollToTop extends Component {
  /**
   * ScrollToTop componentDidUpdate
   */
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  /**
   * ScrollToTop render
   */
  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
