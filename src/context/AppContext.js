import React from 'react';

const AppContext = React.createContext({});

export const GiftAidProvider = AppContext.Provider;
export const GiftAidConsumer = AppContext.Consumer;

export default AppContext;
