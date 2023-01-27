/*
 import FoodList from './components/FoodList';
 import Greeting from './components/Greeting';
 import Hello from './components/Hello';
 import ItemMain from './components/item/ItemMain';
*/
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
// import TodoTemplate from './components/todo/TodoTemplate';
// import Join from './components/user/Join';
import Login from './components/user/Login';

// reactstrap(bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>    
      {/* 
        <Greeting />
        <FoodList />
        <Hello />
        <ItemMain /> 
      */}
      <Header />
      {/* <TodoTemplate /> */}
      {/* <Join /> */}
      <Login />
      <Footer />
    </>
  );
}

export default App;
