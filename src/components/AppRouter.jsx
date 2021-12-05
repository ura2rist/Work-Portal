import React from 'react';
import Events from '../pages/Events';
import Directory from '../pages/Directory';
import News from '../pages/News';
import { Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <Routes>
      <Route path="news" element={<News />} />
      <Route path="events" element={<Events />} />
      <Route path="directory" element={<Directory />} />
    </Routes>
  );
};

export default AppRouter;