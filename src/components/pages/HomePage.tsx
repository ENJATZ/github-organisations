import React from "react";
import { HomePageContainer } from "../Home/logic/HomePageContainer.tsx";
import { Home } from "../Home/ui/Home.tsx";

export const HomePage = () => {
  return (
    <HomePageContainer
      render={(args) => <Home {...args} />}
      renderLoading={() => <Home.Skeleton />}
    />
  );
};
