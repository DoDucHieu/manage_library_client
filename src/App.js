import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "./store/store";

import LayoutWrapperComponent from "./common/component/LayoutWrapperComponent";

const App = () => {
  return (
    <>
      <Provider store={configureStore.store}>
        <PersistGate loading={null} persistor={configureStore.persistor}>
          <BrowserRouter>
            <LayoutWrapperComponent />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
};
export default App;
