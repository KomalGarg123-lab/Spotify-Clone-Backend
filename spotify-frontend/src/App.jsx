// React Router imports for SPA navigation
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all page components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import UploadMusic from "./pages/UploadMusic";
import Library from "./pages/Library";
import Search from "./pages/Search";

// Import Sidebar component (navigation menu)
import Sidebar from "./components/Sidebar";


// ==========================
//  Main App Component
// ==========================
function App() {
  return (
    // BrowserRouter → React Router ko activate karta hai
    <BrowserRouter>

      {/* Flex container → Sidebar + Page content side by side */}
      <div style={{ display: "flex" }}>

        {/* Sidebar component → navigation menu */}
        <Sidebar />

        {/* Routes container → all route definitions */}
        <Routes>

          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Albums page */}
          <Route path="/albums" element={<Albums />} />

          {/* Album details page (dynamic route) */}
          {/* :id → URL parameter (e.g., /albums/5) */}
          <Route path="/albums/:id" element={<AlbumDetails />} />

          {/* Upload music page */}
          <Route path="/upload" element={<UploadMusic />} />

          {/* Library page */}
          <Route path="/library" element={<Library />} />

          {/* Search page */}
          <Route path="/search" element={<Search />} />

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Register page */}
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Export App → entry point of the application
export default App;

/*App.jsx poori application ka main entry point hai 
jo React Router ke through Single Page Application (SPA) 
setup karta hai. Ye <BrowserRouter> use karta hai URL changes
 ko track karne ke liye. <Sidebar /> component navigation menu provide karta hai, 
 aur <Routes> ke andar <Route> define karke different URLs pe 
 kaunsa page render hoga ye decide hota hai. Dynamic routes (/albums/:id) 
 bhi handle kiye jaate hain jisse URL parameters pages me access ho sake.
  Flex container use karke Sidebar aur main content side by side display hota hai.
   Overall, App.jsx poore app ka layout aur navigation controller hai */