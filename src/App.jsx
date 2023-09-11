import { Outlet } from "react-router-dom";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "primereact/resources/themes/vela-green/theme.css";
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";

function App() {
  return (
      <div className="App">
        <Outlet />
      </div>
  );
}

export default App;
