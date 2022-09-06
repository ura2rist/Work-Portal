import React, { useState } from 'react';
import Events from '../pages/Events';
import Directory from '../pages/Directory';
import News from '../pages/News';
import Signin from '../pages/Signin';
import { Routes, Route } from "react-router-dom";
import NewsIdPage from '../pages/NewsIdPage';
import NewsIdPageEdit from '../pages/NewsIdPageEdit';
import Admin from '../pages/Admin';
import Users from './Users';
import EditNews from './EditNews';

function AppRouter() {
  return (
    <Routes>
      <Route path="/news" element={ <News /> } />
      <Route path="/news/:id" element={ <NewsIdPage /> } />
      <Route path="/events" element={ <Events /> } />
      <Route path="/directory" element={ <Directory /> } />
      <Route path="/admin/signin" element={ <Admin /> }>
        <Route path="users" element={ <Users /> } />
        <Route path="news" element={ <EditNews /> } />
      </Route>
      <Route path="/admin/signin/newsEdit/:id" element={ <NewsIdPageEdit /> } />
      <Route path="*" element={ <News /> } />
    </Routes>
  );
};

export default AppRouter;