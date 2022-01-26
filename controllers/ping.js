module.exports = {
  pong: (req, res) => {
    res.status(200).json({
      ok: true,
      msg: 'PONG',
    })
  },
}
