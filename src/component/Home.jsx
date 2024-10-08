import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Video from './Video';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('isLoggedIn');
    if (!user) {
      navigate('/login'); 
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Video />
    </>
  );
}

export default Home;
