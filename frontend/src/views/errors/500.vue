<template>
  <main class="column has-text-centered">
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Erro 500
          </h1>
          <h2 class="subtitle">
            Algum erro inesperado aconteceu no Sonia. Por favor, comunique o administrador do sistema.
          </h2>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'error-500' as string
})
</script>
