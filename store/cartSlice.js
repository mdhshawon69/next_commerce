import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialCartState = {
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    onAdd(state, action) {
      const product = action.payload.product;
      const quantity = action.payload.quantity;

      const checkProductInCart = state.cartItems.find(
        (item) => item._id === product._id
      );

      state.totalQuantities += quantity;
      state.totalPrice = state.totalPrice + product.price * quantity;

      if (checkProductInCart) {
        const updatedCartItems = state.cartItems.map((cartProduct) => {
          if (cartProduct._id === product._id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
              productTotalPrice:
                cartProduct.price * (cartProduct.quantity + quantity),
            };
          }
        });

        state.cartItems = updatedCartItems;
      } else {
        product.quantity = quantity;
        product.productTotalPrice = product.price * product.quantity;
        state.cartItems = [...state.cartItems, { ...product }];
      }

      toast.success(`${state.qty} ${product.name} added to the cart`);
      state.qty = 1;
    },

    toggleCartItemQuantity(state, action) {
      const id = action.payload.id;
      const value = action.payload.value;

      const foundProduct = state.cartItems.find((item) => item._id === id);

      if (value === "inc") {
        foundProduct.quantity = foundProduct.quantity + 1;
        foundProduct.productTotalPrice += foundProduct.price;

        state.totalPrice = state.totalPrice + foundProduct.price;

        state.totalQuantities = state.totalQuantities + 1;
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          foundProduct.quantity = foundProduct.quantity - 1;
          foundProduct.productTotalPrice -= foundProduct.price;

          state.totalPrice = state.totalPrice - foundProduct.price;
          state.totalQuantities = state.totalQuantities - 1;
        }
      }
    },

    incQty(state) {
      state.qty++;
    },

    decQty(state) {
      if (state.qty > 1) {
        state.qty--;
      }
    },

    showCart(state) {
      state.showCart = !state.showCart;
    },

    removeProduct(state, action) {
      const foundProduct = state.cartItems.find(
        (item) => item._id === action.payload.id
      );

      const newCart = state.cartItems.filter(
        (item) => item._id !== action.payload.id
      );

      state.totalPrice =
        state.totalPrice - foundProduct.price * foundProduct.quantity;

      state.totalQuantities = state.totalQuantities - foundProduct.quantity;

      state.cartItems = [...newCart];

      toast.success(
        `${foundProduct.name} is successfully removed form the cart`
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
