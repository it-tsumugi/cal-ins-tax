import { VFC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Top } from "../components/pages/Top";

import { pathData } from "../constant/pathData";

export const ComponentRouter: VFC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={pathData.top} element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
};
