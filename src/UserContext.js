import * as React from "react";

export const UserContext = React.createContext({
  user: null,
  settings: null,
  isLoggedId: false,
  logIn: () => {},
  logOut: () => {},
  handleChangeNotification: () => {}
});
