import React from 'react';
import { Link } from 'react-router'

const CallToAction = React.createClass({
  render() {
    const { children, className, to, ...props } = this.props;

    if (to.startsWith('http')) {
      return (
        <a href={to} target="_blank" {...props} className={'btn btn-lg '+className}>
          {children}
        </a>
      );
    } else {
      return (
        <Link to={to} {...props} className={'btn btn-lg '+className}>
          {children}
        </Link>
      );
    }
  }
});

export default CallToAction;

