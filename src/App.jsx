import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/appStore";
import { routePaths, routes } from "./utils/routes";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename={routePaths.home}>
          <Routes>
            <Route path={routePaths.home} element={<Body />}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Route>
            <Route path="*" Component={NotFound} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
