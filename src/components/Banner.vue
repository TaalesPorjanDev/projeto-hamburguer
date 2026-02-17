<template>
  <div id="main-banner">
    <h1>Make your Burguer</h1>
  </div>
</template>

<script setup></script>

<style scoped>
#main-banner {
  background-image: url('/img/burguer.jpg');
  background-position: 0 -250px;
  height: 90vh;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#main-banner h1 {
  color: #fff;
  text-align: center;
  font-size: 60px;
  background-color: #222;
  padding: 20px 40px;
}
</style>
