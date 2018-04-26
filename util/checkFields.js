module.exports = function(fields) {
  return function checkFields(req, res, next) {
    if (!req.body) {
      res.json({
        succuess: false,
        message: 'Does not have any fields',
        fields: fields
      });
    }
    let data = req.body;
    let hasEveryField = fields.every(function(field) {
      return data.hasOwnProperty(field);
    });
    if (!hasEveryField) {
      res.json({
        succuess: false,
        message: 'Does not have every field',
        fields: fields
      });
    }
    next();
  };
};
