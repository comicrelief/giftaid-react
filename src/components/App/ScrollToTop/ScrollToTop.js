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
    // ScrollToTop componentDidUpdate
    window.scrollTo(0, 0);
  },[]);

  return null;
};


export default withRouter(ScrollToTop);
