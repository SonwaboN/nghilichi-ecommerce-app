import { nanoid } from 'nanoid';

export const generateTrackingToken = () => nanoid(16);

export const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${timestamp}-${random}`.toUpperCase();
};
