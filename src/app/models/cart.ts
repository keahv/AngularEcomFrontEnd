export interface Cart {
    cartId?: number; // Optional for new entries
    user: {
      id: number;
    };
    product: {
      id: number;
    };
    quantity: number;
  }
  