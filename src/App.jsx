import { Provider } from "react-redux";
import "./App.css";
import RoutesApp from "./routes/Routes";
import UserStore from "./redux/store";

function App() {
  return (
    <Provider store={UserStore}>
      <RoutesApp />
    </Provider>
  );
}

export default App;
