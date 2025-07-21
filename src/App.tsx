import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
