<template>
  <main class="column has-text-centered">
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Erro 401 - Não autorizado
          </h1>
          <h2 class="subtitle">
            Para acessar o recurso realize o login.
          </h2>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'error-401' as string
})
</script>
