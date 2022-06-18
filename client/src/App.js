import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useContext } from "react";
//
import { ThemeContext } from "./context/ThemeContext";
//
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Planner from "./pages/Planner";
import RecipeDetail from "./pages/RecipeDetail";
import Shopping from "./pages/Shopping";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
//
import NavBar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ShoppingCard from "./components/shopping/ShoppingCard";
//
function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <NavBar />
      <main className={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/grocery" element={<Shopping />}>
            <Route path=":id" element={<ShoppingCard />} />
          </Route>
          <Route path="/planner" element={<Planner />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
