"use client"
// components/Notifications.js
import React from 'react';
import { Dropdown, Popover, OverlayTrigger } from 'react-bootstrap';
import styles from './Notifications.module.css';
import { notifications } from '@/data/notification';

const Notifications = () => {
  return (
    <div className="section-full bg-white content-inner-2">
      <div className="container">
        <div className="d-flex notification-title-bx section-head mb-4">
          <div className="mr-auto">
            <h2 className="m-b5">Notifications</h2>
          </div>
        </div>
        <ul className="post-job-bx browse-job notification-scroll-mob">
          {notifications.map((notification) => (
            <li key={notification.id} className={`card mb-2 ${styles.notification}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className={`${styles.messageContainer}`}>
                  <div className={`${styles.iconWrapper}`}>
                      <i className={`fa ${notification.icon} ${styles.icon}`}></i>
                    </div>
                    <h6 className={`card-title mb-1 ${styles.message}`}>
                      <i className={`fa ${notification.icon} ${styles.icon} mr-2`}></i>
                      {notification.message}
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <small className={styles.time}>{notification.time}</small>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      overlay={
                        <Popover id="popover-basic" className={styles.popoverContent}>
                          <Dropdown.Item href="#/action-1">
                            <i className="fa fa-trash mr-2"></i> Delete notification
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            <i className="fa fa-thumbs-down mr-2"></i> Show less like this
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            <i className="fa fa-bell-slash mr-2"></i> Turn off this notification type
                          </Dropdown.Item>
                        </Popover>
                      }
                    >
                      <i className="fa fa-ellipsis-h" style={{ cursor: 'pointer', fontSize: '20px', color: '#888' }}></i>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
