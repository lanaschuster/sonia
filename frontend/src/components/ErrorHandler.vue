<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AxiosResponse } from 'axios'

import EventBus from './event/event-bus'

@Component
export default class ErrorHandler extends Vue {
  public created(): void {
    EventBus.$on('errorCaught', this.displayError)
  }

  public beforeDestroy(): void {
    EventBus.$off('errorCaught', this.displayError)
  }

  public displayError(event: AxiosResponse): void {
    const status = event?.status
    const data = event?.data

    if (status === 400) {
      if (!data) {
        this.showToast(this.translate('comuns.feedback.bad-request'))
      } else {
        if (data?.error === 'invalid_grant') {
          this.showToast(this.translate('comuns.feedback.bad-credentials'), 'is-warning')
        } else {
          this.showToast(data?.message, 'is-warning')
        }
      }
    } else if (status === 401) {
      this.$router.push({ name: '401' })
    } else if (status === 403) {
      this.$router.push({ name: '403' })
    } else if (status === 500) {
      if (data.includes('ECONNREFUSED')) {
        this.showToast(this.translate('comuns.feedback.erro-conexao'))
      } else {
        this.showToast(this.translate('comuns.feedback.erro-servidor'))
      }
    }
  }

  private showToast(message: string, type = 'is-danger'): void {
    this.$buefy.toast.open({ message: message, type: type, duration: 3500 })
  }

  private translate(message: string): string {
    return this.$t(message).toString()
  }
}
</script>
