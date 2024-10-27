<template>
    <div class="not-found-page">
      <h1>404</h1>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <router-link to="/">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFoundPage",
  };
  </script>
  
  <style scoped>
  .not-found-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #f5f5f5;
  }
  
  h1 {
    font-size: 5rem;
    margin: 0;
    color: #ff6347;
  }
  
  p {
    font-size: 1.5rem;
    color: #666;
    margin: 1rem 0;
  }
  
  a {
    font-size: 1rem;
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  