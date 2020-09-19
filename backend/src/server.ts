import { connection } from './infrastructure/database/config'
import { app } from './app'

const PORT = process.env.PORT || 8085

app.listen(PORT, () => {
  connection
  console.log(`Sonia is listening on port ${PORT}`)
})
