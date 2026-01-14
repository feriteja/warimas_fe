// lib/api.ts
import { Order, OrderListResponse } from "@/types";

export async function getOrders(page: number = 1): Promise<OrderListResponse> {
  // SIMULATE API CALL
  // In production: const res = await fetch(`https://api.yoursite.com/orders?page=${page}`, { cache: 'no-store' });

  // Simulating delay for SSR demonstration
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Returning the data structure you provided
  return {
    data: {
      orderList: {
        pageInfo: {
          totalItems: 39,
          totalPages: 39,
          page: page,
          limit: 1,
          hasNextPage: page < 39,
        },
        items: [
          // Using your sample data structure
          {
            id: 43,
            externalId: "pay_2f0aadefb936",
            invoiceNumber: null,
            user: { id: 41 },
            pricing: {
              currency: "IDR",
              subtotal: 17828,
              total: 39610,
              tax: 1782,
              discount: 0,
              shippingFee: 20000,
            },
            items: [
              {
                id: 56,
                quantity: 1,
                quantityType: "UNIT",
                pricing: { price: 17828, subtotal: 17828 },
                variant: {
                  id: "40e2ae6e",
                  name: "Kertas & Tisu 5 - Var 2",
                  productName: "Kertas & Tisu 5",
                  imageUrl: "https://placehold.co/60x60", // Placeholder image
                },
              },
            ],
            shipping: {
              address: { id: "18ad", receiverName: "USER", name: "Rumah 3" },
            },
            timestamps: {
              createdAt: "2026-01-14T06:56:32.454404+07:00",
              updatedAt: "2026-01-14T06:56:32.454404+07:00",
            },
          },
        ],
      },
    },
  };
}

// lib/api.ts

// Simulate a database fetch with a delay
export async function getOrderById(orderId: string): Promise<Order | null> {
  // TOGGLE THIS TO TEST ERROR HANDLING
  const simulateError = false;
  if (simulateError) throw new Error("Failed to connect to database");

  // YOUR JSON DATA
  const mockDB: Order = {
    id: 41,
    externalId: "pay_48c49930651d",
    invoiceNumber: null,
    status: "PENDING_PAYMENT",
    items: [
      {
        id: 54,
        quantity: 2,
        quantityType: "UNIT",
        variant: {
          id: "eb86fa4f",
          name: "Kertas & Tisu 3 - Var 2",
          productName: "Kertas & Tisu 3",
          imageUrl: null, // We will handle null images
        },
        pricing: { price: 3173, subtotal: 6346 },
      },
    ],
    user: { id: 41 },
    pricing: {
      currency: "IDR",
      subtotal: 6346,
      tax: 634,
      discount: 0,
      shippingFee: 20000,
      total: 26980,
    },
    shipping: {
      address: {
        id: "5728",
        name: "Rumah 1",
        receiverName: "Budi Santoso",
        phone: "081333999221",
        addressLine1: "Jl. Citere 1 No 4",
        addressLine2: "Dekat masjid",
        city: "Bandung",
        province: "Jawa Barat",
        country: "ID",
        postalCode: "40378",
      },
    },
  };

  // Simulate API Delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate finding the specific ID (Logic for demo purposes)
  if (orderId === "41") return mockDB;

  return null; // Return null if not found
}
