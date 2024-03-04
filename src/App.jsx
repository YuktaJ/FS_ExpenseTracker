import { Route, Redirect, Switch } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Home from "./pages/Home";
import Footer from "./components/Layout/Footer";
import AuthPage from "./pages/AuthPage";
import Expense from "./pages/Expense";
import ErrorPage from "./pages/ErrorPage";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import Premium from "./pages/Premium";
const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn, "Login status");
  return (
    <>
      <DefaultLayout></DefaultLayout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home"></Redirect>
        </Route>
        <Route path="/home" exact>
          <Home></Home>
        </Route>
        <Route path="/auth">
          <AuthPage></AuthPage>
        </Route>
        <Route path="/premium">
          {isLoggedIn && <Premium></Premium>}
          {!isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>

        <Route path="/expenses">
          {isLoggedIn && <Expense></Expense>}
          {!isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>

        <Route path="*">
          <ErrorPage></ErrorPage>
        </Route>
      </Switch>
      <Footer></Footer>
    </>
  );
};
export default App;
