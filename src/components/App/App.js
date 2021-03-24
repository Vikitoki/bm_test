import MainPage from "../../pages/main-page";
import store from "../../redux/store";
import { Provider } from "react-redux";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="intro">
        <div className="intro__container container">
          <div className="intro__content">
            <MainPage />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
