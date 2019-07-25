const users = require("../models/users")

exports.list = (req, res) => {
    users.list()
    .then(data => {
        res.status(200).json({
            success: true,
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: error
        })
    })
}

exports.create = (req, res) => {
    const body = req.body

    users.findOne(body.email)
    .then(student => {
        if(!student) {
            users.create(body)
            .then(() => {
                res.status(200).json({
                    success: true,
                })
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: error
                })
            })

            return
        }

        res.status(500).json({
            success: false,
            code: "user_exists",
            message: 'Usuário já cadastrado'
        })
    })
    .catch(error => {
        console.log("ERROR", error)
        res.status(500).json({
            success: false,
            message: error
        })
    })

}

//TODO alter method
exports.update = (req, res) => {
    const student_id = req.params.id
    const body = req.body

    let data = {}

    if(body.name) { data.name = body.name }
    if(body.birth_date) { data.birth_date = body.birth_date }
    if(body.phone) { data.phone = body.phone }

    users.findOne(student_id)
    .then(student => {
        if(student) {
            users.update(student_id, data)
            .then(() => {
                res.status(200).json({
                    success: true,
                })
            })
            .catch(error => {
                res.status(500).json({
                    success: false,
                    message: error
                })
            })

            return
        }

        res.status(404).json({
            success: false,
            code: "user_not_found",
            message: 'Usuário não encontrado'
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: error
        })
    })
}

exports.get = (req, res) => {
    const student_id = req.params.id

    console.log(student_id)
        
    users.findOne(student_id)
    .then(result => {
        if(result) {
            res.status(200).json({
                success: true,
                data: result
            })

            return;
        }

        res.status(404).json({
            success: false,
            code: "user_not_found",
            message: "Usuário não encontrado"
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: error
        })
    })
}