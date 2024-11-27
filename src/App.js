import { LocalizationProvider } from '@mui/x-date-pickers';
import './App.css';
import Header from './layouts/header/Header';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function App() {
    return <LocalizationProvider dateAdapter={AdapterMoment}>
        <Header />
    </LocalizationProvider>;
}

export default App;
