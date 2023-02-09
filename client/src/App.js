import { BrowserRouter } from 'react-router-dom';

import 'react-notifications/lib/notifications.css'
import './App.css';
import ActorApp from './components/actor/actorApp/ActorApp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ActorApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
