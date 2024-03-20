const accessList = require("../models/accessModel");

exports.newAccessList = async (req, res) => {
  console.log(req.body, "req.boody---------------");

  const accessData = await accessList.create({
    name: req.body.name,
  });

  return res
    .status(201)
    .json({
      status: "success",
      message: "New access has been added",
      data: {
        accessData,
      },
    })
    .catch((err) => {
      return res.status(401).json({
        success: false,
        message: "Error in adding access",
        error: err.message,
      });
    });
};
