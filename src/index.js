import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {BrowserRouter} from 'react-router-dom'
import { UserProvider } from './contexts/UserContext';
import { PostProvider } from './contexts/PostContext';
import { CommentsProvider } from './contexts/CommentsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <PostProvider>
        <CommentsProvider>
          <App />
        </CommentsProvider>
      </PostProvider>
    </UserProvider>
  </BrowserRouter>
);


