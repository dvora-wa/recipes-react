import Main from './component/Main';
import { UserProvider } from './context/userContext';

const App = () => {
    return (
        <UserProvider>
            <Main />
        </UserProvider>
    );
};

export default App;
