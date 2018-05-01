module.exports = function(fields) {
  return function checkFieldsExist(req, res, next) {
    if (Object.entries(req.body).length === 0) {
      return next();
    }

    let data = req.body;

    switch (req.method) {
      case 'POST':
        let haveEveryField = fields.every(function(field) {
          return data.hasOwnProperty(field);
        });

        if (!haveEveryField) {
          return res.status(400).json({
            success: false,
            message: 'Does not have every field',
            fields: fields
          });
        }
        break;
      case 'PUT':
        let haveFields = Object.keys(data).every(function(field) {
          return fields.includes(field);
        });

        if (!haveFields) {
          return res.status(400).json({
            success: false,
            message: 'Fields do not match',
            fields: fields
          });
        }
        break;
      default:
        break;
    }

    return next();
  };
};
