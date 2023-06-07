import { Routes, Route } from 'react-router-dom';
import Container from "@mui/material/Container";
import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Header } from "./components";
import { Home, Registration,Login, SensorDataComponent } from "./pages";
import { fetchMeData, Authornot } from './reduxe/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(Authornot);
  React.useEffect(() => {
    dispatch(fetchMeData());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/sensorDataComponent" element={<SensorDataComponent />} />
      </Routes>
      </Container>
    </>
  );
}

export default App;
