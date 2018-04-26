module.exports = function(fields) {
  return function checkFields(req, res, next) {
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
          return res.json({
            success: false,
            message: 'Does not have every field',
            fields: fields
          });
        }
      case 'PUT':
        let haveFields = Object.keys(data).every(function(field) {
          return fields.includes(field);
        });

        if (!haveFields) {
          return res.json({
            success: false,
            message: 'Fields do no match',
            fields: fields
          });
        }
      default:
    }

    return next();
  };
};
