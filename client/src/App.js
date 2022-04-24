import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Planner from "./pages/Planner";
import RecipeDetail from "./pages/RecipeDetail";
import MainHeader from "./components/MainHeader";
import GroceryList from "./pages/Grocery";

function App() {
  return (
    <BrowserRouter>
      <div>
        <MainHeader />
        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />}>
              <Route
                path="new-user"
                element={<p>Welcome, new user!</p>}
              ></Route>
            </Route>
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/grocery" element={<GroceryList />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/products/:productId" element={<RecipeDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/a-book
