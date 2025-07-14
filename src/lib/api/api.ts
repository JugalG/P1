import { Product } from "../features/types/product";

const BASE_URL = "http://localhost:8000";

//users
export async function loginUser(email: string, password: string) {
  const res = await fetch(
    `http://localhost:8000/users?email=${email}&password=${password}`
  );
  const data = await res.json();
  if (res.ok && data.length > 0) {
    console.log("Logged in succcessfully");
  }
  return data.length > 0 ? data[0] : null;
}

//cart(user-data)

export async function fetchUserCart(userId: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/user-data/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user cart");
  const data = await res.json();
  // console.log("API CALL for CART DATA:",data.cart);
  // console.log("Objecet DATA:",Object.values(data.cart));
  return data.cart ? Object.values(data.cart) : [];
  // return data.cart ;
}

export async function updateUserCartItem(
  userId: string,
  item: Product
): Promise<void> {
  const userCartRes = await fetch(`${BASE_URL}/user-data/${userId}`);
  if (!userCartRes.ok) throw new Error("Failed to fetch user cart");
  const userCart = await userCartRes.json();
  const updatedCart = {
    ...userCart.cart,
    [item.id]: item,
  };
  await fetch(`${BASE_URL}/user-data/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart: updatedCart }),
  });
}
export async function updateUserCart(
  userId: string,
  itemToRemove: Product
): Promise<void> {
  const res = await fetch(`http://localhost:8000/user-data/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user cart");

  const userCartData = await res.json();
  const cart: Record<string, Product> = userCartData.cart || {};

  delete cart[itemToRemove.id];

  const updatedRes = await fetch(`http://localhost:8000/user-data/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart }),
  });

  if (!updatedRes.ok)
    throw new Error("Failed to update user cart after deletion");
}

export async function emptyUserCart(userId: string): Promise<void> {
  await fetch(`${BASE_URL}/user-data/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart: {} }),
  });
}

const convertToCartObject = (cart: Product[]) => {
  cart.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, Product>);
};

export async function syncCartWithServer(
  userId: string,
  cartProducts: Product[]
) {
  const cartObj = convertToCartObject(cartProducts);
  console.log("updated cart object to server");
  const res = await fetch(`http://localhost:8000/user-data/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart: cartObj }),
  });

  if (!res.ok) throw new Error("Failed to update cart on server");
  return res;
}
