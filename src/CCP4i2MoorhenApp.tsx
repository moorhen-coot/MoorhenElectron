import './App.css';
import { CCP4i2MoorhenContainer } from './wrapper/CCP4i2MoorhenContainer';
import { PreferencesContextProvider } from 'moorhen';

function App() {
  return (
  <div className="App">
    <PreferencesContextProvider>
      <CCP4i2MoorhenContainer/>
    </PreferencesContextProvider>
  </div>
  );
}
export default App;
