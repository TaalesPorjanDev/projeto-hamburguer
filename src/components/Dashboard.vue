<template>
  <div id="burguer-table">
    <MensagemRemovida :msg="msg" v-show="msg" />
    <div>
      <div id="burguer-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burguer-table-rows">
      <div class="burguer-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul>
            <li v-for="(opcional, index) in burger.opcionais" :key="index">
              {{ opcional }}
            </li>
          </ul>
        </div>
        <div>
          <select
            name="status"
            class="status"
            @change="updateBurger($event, burger.id)"
          >
            <option value="">Selecione</option>
            <option
              v-for="s in status"
              :key="s.id"
              :value="s.tipo"
              :selected="burger.status == s.tipo"
            >
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burger.id)">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MensagemRemovida from './MensagemRemovida.vue';
import { ref, onMounted } from 'vue';

const burgers = ref(null);
const burger_id = ref(null);
const status = ref(null);
const msg = ref(null)

async function getPedidos() {
  const req = await fetch('http://localhost:3000/burgers');
  const data = await req.json();

  burgers.value = data;

  // resgatar os status
  getStatus();
}

async function getStatus() {
  const req = await fetch('http://localhost:3000/status');
  const data = await req.json();

  status.value = data;
}

async function deleteBurger(id) {
  const req = await fetch(`http://localhost:3000/burgers/${id}`, {
    method: 'DELETE',
  });

  const res = await req.json();

  // colocar uma mensagem de sistema
  msg.value = `Pedido removido com sucesso!`;

  // limpar mensagem
  setTimeout(() => {
    msg.value = '';
  }, 3000);
  
  // limpar os campos

  getPedidos();
}

async function updateBurger(event, id) {
  const option = event.target.value;

  const dataJson = JSON.stringify({ status: option });

  const req = await fetch(`http://localhost:3000/burgers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: dataJson,
  });

  const res = await req.json();

    // colocar uma mensagem de sistema
  msg.value = `O Pedido N° ${res.id} foi atualizado para ${res.status}!`;

  // limpar mensagem
  setTimeout(() => {
    msg.value = '';
  }, 3000);
  // limpar os campos
  console.log(res)


}

onMounted(() => {
  getPedidos();
});
</script>

<style scoped>
#burguer-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burguer-table-heading,
#burguer-table-rows,
.burguer-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burguer-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#burguer-table-heading div,
.burguer-table-row div {
  width: 19%;
}

.burguer-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

#burguer-table-heading .order-id,
.burguer-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 10px;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
