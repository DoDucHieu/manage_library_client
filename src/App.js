import { BrowserRouter } from "react-router-dom";
import LayoutWrapperComponent from "./component/LayoutWrapperComponent";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <LayoutWrapperComponent />
      </BrowserRouter>
    </>
  );
};
export default App;
