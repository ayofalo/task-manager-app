import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import TodoList from "./components/TodoList/TodoList";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
