import { useSelector, shallowEqual } from "react-redux";
import { get } from "../utils/lodash";

//will defien regex over here if needed later----------------
// const REGEX = {
//   IS_EMAIL: /\S+@\S+\.\S{2,}/,
//   IS_PWD: /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
//   IS_MOBILE_NO: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
//   IS_NUMBER_ONLY: /^[0-9\b]+$/,
//   IS_EMPTY_STRING: /^\s+$/,
//   IS_URL:
//     /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
// };

// export const isEmail = (email) => REGEX.IS_EMAIL.test(email);

export const RoleBasedLoginCurrentUser = () => {
  const { loginToken, user } = useSelector((state) => {
    return {
      loginToken: get(state, "LoginSlice.loginToken", null),
      user: get(state, "loginSlice.user", null),
    };
  }, shallowEqual);
  const localStorageToken = localStorage.getItem("token" || loginToken);
  return { localStorageToken, user };
};
