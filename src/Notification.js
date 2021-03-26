import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Notification extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    title: PropTypes.node,
    message: PropTypes.node,
    html: PropTypes.node,
    timeOut: PropTypes.number,
    onClick: PropTypes.func,
    onRequestHide: PropTypes.func
  };

  static defaultProps = {
    type: 'info',
    title: null,
    message: null,
    html: null,
    timeOut: 5000,
    onClick: () => {
    },
    onRequestHide: () => {
    }
  };

  componentDidMount = () => {
    const { timeOut } = this.props;
    if (timeOut !== 0) {
      this.timer = setTimeout(this.requestHide, timeOut);
    }
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
    this.requestHide();
  };

  negateClickCallback = (e) => {
    e.stopPropagation();
    this.requestHide();
  }

  requestHide = () => {
    const { onRequestHide } = this.props;
    if (onRequestHide) {
      onRequestHide();
    }
  };

  render() {
    const { type, html } = this.props;
    let { title, message } = this.props;
    const dangerousHtml = { __html: html };
    const className = classnames(['notification', `notification-${type}`]);
    title = title ? (<h4 className="title">{title}</h4>) : null;
    message = message ? (<div className="message">{message}</div>) : null;
    const dangerousHtmlElement = html ? (<div className="message raw" dangerouslySetInnerHTML={dangerousHtml} />) : null;
    return (
      <div className={className} onClick={this.handleClick}>
        <div className="notification-message" role="alert">
          {title}
          {message}
          {dangerousHtmlElement}
        </div>
        <div className="notification-closer" onClick={this.negateClickCallback}/>
      </div>
    );
  }
}

export default Notification;
