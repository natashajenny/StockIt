import * as React from 'react';

export const UserContext = React.createContext({
    userId: -1,
    isLoggedId: false,
    logIn: () => {},
});
