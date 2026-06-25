import { RouterProvider } from 'react-router-dom';
import { router } from './routes'; // Points to your routes file

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;