export interface GuestUser {
  email: string;
  name: string;
  phone?: string;
}

export interface GuestOrder extends GuestUser {
  orderId: string;
  trackingToken: string;
}
