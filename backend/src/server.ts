import { app } from './app'

const PORT = process.env.PORT || 8085

app.listen(PORT, () => {
  console.log(`Sonia is listening on port ${PORT}`)
})