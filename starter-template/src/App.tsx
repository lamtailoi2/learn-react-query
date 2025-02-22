import MainLayout from "layouts/MainLayout";
import About from "pages/About";
import AddStudent from "pages/AddStudent";
import Dashboard from "pages/Dashboard";
import NotFound from "pages/NotFound";
import Students from "pages/Students";
import { ToastContainer } from "react-toastify";
import { useRoutes } from "react-router-dom";

function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/students",
      element: <Students />,
    },
    {
      path: "/students/:id",
      element: <AddStudent />,
    },
    {
      path: "/students/add",
      element: <AddStudent />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div className="App">
      <MainLayout>
        <ToastContainer />
        {elements}
      </MainLayout>
    </div>
  );
}

export default App;
