import { Component, Vue } from 'vue-property-decorator'
import { ValidationObserver } from 'vee-validate'

import { AxiosResponse } from 'axios'
import moment from 'moment'

import EventBus from '@/components/event/event-bus'

@Component({
  filters: {
    formatDate(value: any) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },
    formatDateTime(value: any) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm')
      }
    },
    formatCurrency(value: any) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
})
class FormUtilities extends Vue {
  protected loading = false
  protected actionLoading = false

  /**
   * Helper method to clear all validations on the form observer
   */
  protected clearValidations(): void {
    this.$nextTick(() => {
      (this.$refs.formObserver as InstanceType<typeof ValidationObserver>).reset()
    })
  }

  /**
   * Helper method to go back with Vue-Router
   */
  protected goBack(): void {
    this.$router.go(-1)
  }

  /**
   * Helper method to define if the message should be displayed on the console
   *
   * It only applies to http-500 messages
   *
   * @param error response from Axios
   */
  protected shouldLog(error: AxiosResponse): void {
    EventBus.$emit('errorCaught', error)
  }

  /**
   * Toast a success message
   *
   * @param text for the i18n key to the message
   */
  protected toastSuccess(text: string): void {
    this.toast(text, 'is-success')
  }

  /**
   * Toast an info message
   *
   * @param text for the i18n key to the message
   */
  protected toastInfo(text: string): void {
    this.toast(text, 'is-info')
  }

  /**
   * Toast a danger message
   *
   * @param text for the i18n key to the message
   */
  protected toastDanger(text: string): void {
    this.toast(text, 'is-danger')
  }

  /**
   * Toast a warning message
   *
   * @param text for the i18n key to the message
   */
  protected toastWarning(text: string): void {
    this.toast(text, 'is-warning')
  }

  /**
   * Simple toast helper method to display messages
   *
   * @param text the message to be parsed by i18n parser
   * @param style to be used as decoration for this toast
   */
  protected toast(text: string, style: string): void {
    this.$buefy.toast.open({ message: this.translate(text), type: style })
  }

  /**
   * Simple helper method to translate an i18n key and return it as string instead
   * of a TranslateResult
   *
   * @param textKey the key to the message
   */
  protected translate(textKey: string): string {
    return this.$t(textKey).toString()
  }

  /**
   *
   * @param date a data a ser formatada
   */
  private formatarData(date: Date): string {
    return moment(date).locale('pt-br').format('DD/MM/YYYY')
  }

  /**
   *
   */
  private traduzirMeses(): string[] {
    moment.locale('pt-br')
    return moment.months()
  }

  /**
   *
   */
  private traduzirDias(): string[] {
    moment.locale('pt-br')
    return moment.weekdaysMin()
  }
}

export default FormUtilities
