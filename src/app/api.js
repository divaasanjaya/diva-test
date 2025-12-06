let dataArray = [];

exports.inputData = async (req, res) => {
    dataArray.push(req.body);

    return res.status(201).send({
        message: "Data berhasil ditambahkan",
        data: req.body
    });
};

exports.getData = async (req, res) => {
    return res.status(200).send({
        data: dataArray
    });
};
