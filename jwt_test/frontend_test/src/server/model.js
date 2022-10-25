search : {
    id : (body, callback) => {
        User.findAll({
            where: {
                username : body.user_name,
                email : body.user_email
            }
        })
        .then(result => { callback(result) })
        .catch(err => { throw err; })
    }
}

