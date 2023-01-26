/*
 import FoodList from './components/FoodList';
 import Greeting from './components/Greeting';
 import Hello from './components/Hello';
 import ItemMain from './components/item/ItemMain';
*/
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TodoTemplate from './components/todo/TodoTemplate';

// reactstrap(bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css';
import Join from './components/user/Join';

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
      <Join />
      <Footer />
    </>
  );
}

export default App;
