import Form from "./components/Form"
import './App.css';
import { useState } from "react";
import FormList from "./components/FormList";

function App() {

  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  }

  return (
    <div className="App">
      <Form addUser={addUser} />
      <FormList users={users} />
    </div>
  );
}

export default App;
