<template>
  <div>
    <Message :msg="msg" v-show="msg"/>
    <div>
      <form id="burguer-form" @submit.prevent="createBurguer">
        <div class="input-container">
          <label for="nome">Nome do cliente:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="nome"
            placeholder="Digite o seu nome"
          />
        </div>
        <div class="input-container">
          <label for="pao">Escolha o pão:</label>
          <select name="pao" id="pao" v-model="pao">
            <option value="">Selecione o seu pão</option>
            <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
              {{ pao.tipo }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="carne">Escolha a carne do seu Burguer:</label>
          <select name="carne" id="carne" v-model="carne">
            <option value="">Selecione o tipo de carne</option>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
              {{ carne.tipo }}
            </option>
          </select>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="opcionais"
            >Selecione os opcionais:</label
          >
          <div
            class="checkbox-container"
            v-for="opcional in opcionaisdata"
            :key="opcional.id"
          >
            <input
              type="checkbox"
              name="opcionais"
              v-model="opcionais"
              :value="opcional.tipo"
            />
            <span>{{ opcional.tipo }}</span>
          </div>
        </div>
        <div class="input-container">
          <input class="submit-btn" type="submit" value="Criar meu Burger!" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Message from './Message.vue';
import { ref, onMounted } from 'vue';

const paes = ref(null);
const carnes = ref(null);
const opcionaisdata = ref(null);
const nome = ref(null);
const pao = ref(null);
const carne = ref(null);
const opcionais = ref([]);
const msg = ref(null);

async function getIngredientes() {
  const req = await fetch('http://localhost:3000/ingredientes');
  const data = await req.json();

  paes.value = data.paes;
  carnes.value = data.carnes;
  opcionaisdata.value = data.opcionais;
}

async function createBurguer() {
    const data = {
       nome: nome.value,
       carne: carne.value, 
       pao: pao.value,
       opcionais: Array.from(opcionais.value),
       status: "Solicitado"
    }

   const dataJson = JSON.stringify(data)
  
   const req = await fetch('http://localhost:3000/burgers', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: dataJson
   });

   const res = await req.json();
   
   // colocar uma mensagem de sistema
   msg.value = `Pedido N° ${res.id} realizado com sucesso`;
   
   // limpar mensagem
   setTimeout(() => {
     msg.value = "";
   }, 3000)
   // limpar os campos

   nome.value = "";
   carne.value = "";
   pao.value = "";
   opcionais.value = "";
   
}

onMounted(() => {
  getIngredientes();
});
</script>

<style scoped>
#burguer-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
