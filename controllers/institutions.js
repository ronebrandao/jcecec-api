const institutions = require("../models/institutions")

exports.list = (req, res) => {
    institutions.list()
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

exports.get = (req, res) => {
    const sigla = req.params.id

    institutions.findOne(sigla)
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
            code: "institution_not_found",
            message: "Instituição não encontrado"
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: error
        })
    })
}