import { logout } from './userRedux';
import { clearCart } from './cartRedux';

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearCart());
  localStorage.removeItem('user');
};