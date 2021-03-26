import React from 'react';
import Document from '../../components/Document';
import { NotificationContainer, NotificationManager } from '../../../../dist/kissu-react-notifications';

class HomePage extends React.Component {
  createNotification = (type) => () => {
    switch (type) {
      case 'info':
        NotificationManager.info('Info message');
        break;
      case 'success':
        NotificationManager.success('Success message', 'Title here');
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Error message', 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
      case 'html':
        NotificationManager.info('', 'HTML', 5000, () => {
          alert('callback');
        }, true, "Take me to <a href='https://google.com'>Google</a>");
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Document title="Home | React notifications" className="page-home">
        <div>
          <div className="page-header">
            <h1>Simple sample</h1>
          </div>
          <button type="button" className="btn btn-info" onClick={this.createNotification('info')}>
            Info
          </button>
          <hr/>
          <button type="button" className="btn btn-success" onClick={this.createNotification('success')}>
            Success
          </button>
          <hr/>
          <button type="button" className="btn btn-warning" onClick={this.createNotification('warning')}>
            Warning
          </button>
          <hr/>
          <button type="button" className="btn btn-danger" onClick={this.createNotification('error')}>
            Error
          </button>
          <hr/>
          <button type="button" className="btn btn-info" onClick={this.createNotification('html')}>
            HTML
          </button>
          <NotificationContainer leaveTimeout={0} enterTimeout={300}/>
        </div>
      </Document>
    );
  }
}

export default HomePage;
