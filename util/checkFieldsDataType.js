module.exports = function(endpoint, dataType) {
  return function checkFieldsDataType(req, res, next) {
    if (Object.entries(req.body).length === 0) {
      return next();
    }
    let data = req.body;
    let prodID = Number.parseInt(req.url.split('?')[0].slice(1));

    for (const key in data) {
      switch (req.method) {
        case 'POST':
          switch (dataType[key]) {
            case 'string':
              if (typeof data[key] !== dataType[key]) {
                return res.render('new', {
                  endpoint: endpoint,
                  error: `'${key}' must be a ${dataType[key]}`,
                  product: data
                });
              }
              break;
            case 'number':
              if (Number.isNaN(new Number(data[key]).valueOf())) {
                return res.render('new', {
                  endpoint: endpoint,
                  error: `'${key}' must be a ${dataType[key]}`,
                  product: data
                });
              }
              if (Number.isNaN(Number.parseInt(data[key]))) {
                return res.render('new', {
                  endpoint: endpoint,
                  error: `'${key}' must be a ${dataType[key]}`,
                  product: data
                });
              }
              break;
            default:
              return res.end();
              break;
          }
          break;
        case 'PUT':
          let id = Number.parseInt(req.params.id);
          switch (dataType[key]) {
            case 'string':
              if (typeof data[key] !== dataType[key]) {
                return res.render('edit', {
                  endpoint: endpoint,
                  error: `'${key}' must be a ${dataType[key]}`,
                  id: prodID,
                  product: data
                });
              }
              break;
            case 'number':
              if (Number.isNaN(new Number(data[key]).valueOf())) {
                return res.render('edit', {
                  endpoint: endpoint,
                  error: `'${key}' must be a ${dataType[key]}`,
                  id: prodID,
                  product: data
                });
              }
              if (Number.isNaN(Number.parseInt(data[key]))) {
                return res.render('edit', {
                  endpoint: endpoint,
                  error: `'${key}' must be a ${dataType[key]}`,
                  id: prodID,
                  product: data
                });
              }
              break;
            default:
              return res.end();
              break;
          }
          break;
        default:
          return res.end();
          break;
      }
    }
    return next();
  };
};
