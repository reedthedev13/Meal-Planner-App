import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Planner from "../pages/Planner";
import ShoppingList from "../pages/ShoppingList";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/recipes" element={<Recipes />} />
    <Route path="/planner" element={<Planner />} />
    <Route path="/shopping-list" element={<ShoppingList />} />
  </Routes>
);

export default AppRouter;
