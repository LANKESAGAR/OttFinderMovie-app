import React from 'react'

const Notification = ({ message, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="notification-ribbon">
            {message}
        </div>
    );
}

export default Notification
