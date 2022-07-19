import { createContext, useState } from "react";

const ShopContext = createContext({
  toggleSearchBar: () => {},
  seeSearchBar: false,
});

export const ShopContextProvider = (props) => {
  const [searchBarIsSeen, setSearchBarIsSeen] = useState(false);

  const toggleFunction = () => {
    setSearchBarIsSeen(!searchBarIsSeen);
  };
  const contextValue = {
    toggleSearchBar: toggleFunction,
    seeSearchBar: searchBarIsSeen,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContext;
