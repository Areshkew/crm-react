import { NotificationType } from '../models/Notification';
import './Notification.css';

const Notification = ({ type, message }: { type: NotificationType, message: string }) => (
  <div className={`notification ${type}`}>
    <span>{message}</span>
  </div>
);
export default Notification;