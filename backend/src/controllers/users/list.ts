const list = (req, res) => {
  return res.status(200).json({
    message: 'list users'
  })
}

export { list }