import React, { useState } from 'react';
import Events from '../pages/Events';
import Directory from '../pages/Directory';
import News from '../pages/News';
import Signin from '../pages/Signin';
import { Routes, Route } from "react-router-dom";
import NewsIdPage from '../pages/NewsIdPage';
import Admin from '../pages/Admin';

function AppRouter() {
  return (
    <Routes>
      <Route path="/news" element={ <News /> } />
      <Route path="/news/:id" element={ <NewsIdPage /> } />
      <Route path="/events" element={ <Events /> } />
      <Route path="/directory" element={ <Directory /> } />
      <Route path="/admin/signin" element={ <Admin /> } />
      <Route path="*" element={ <News /> } />
    </Routes>
  );
};

export default AppRouter;