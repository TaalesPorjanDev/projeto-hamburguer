<template>
    <div class="message-container">
       <p> {{ msg }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    msg: String
})
</script>

<style scoped>
.message-container {
  color: #fff;
  font-weight: bold;
  background-color: #EB2F0C;
  border: 2px solid #EB2F0C;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}
</style>