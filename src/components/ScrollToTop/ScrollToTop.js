import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

/**
 * ScrollToTop function
 */
const ScrollToTop = () => {
  /**
   * ScrollToTop mounts
   */
  useEffect(() => {
    // ScrollToTop componentDidMount
    // and after every render
    window.scrollTo(0, 0);
  });

  return null;
};


export default withRouter(ScrollToTop);
