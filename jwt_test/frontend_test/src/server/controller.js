


search : {
    id : (req, res) => {
      const body = req.body;

      model.search.id(body, result => {
        res.send(result)
      })
    }
  }
