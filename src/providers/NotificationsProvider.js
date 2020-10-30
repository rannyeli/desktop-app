import { createContext, useContext } from 'react';

const notificationsContext = createContext(null);
export const NotificationsProvider = notificationsContext.Provider;

export const useNotifications = () => {
  const notification = useContext(notificationsContext);
  if (notification === null) {
    throw new Error("notification shouldn't be null");
  }
  return notification;
};