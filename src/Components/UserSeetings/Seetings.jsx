import React from 'react';
import UserHeader from '../User/UserHeader';
import { Routes, Route } from 'react-router-dom';

import NotFound from '../../NotFound';
import Head from '../Helper/Head';
import UserSeetings from './userSeetings';

const Seetings = () => {

  return (
    <div className="container">
      <Head title="Minhas Configuracoes" />
      <Routes>
        <Route path="" element={<UserSeetings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Seetings;
