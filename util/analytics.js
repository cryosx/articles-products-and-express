module.exports = (function() {
  const fs = require('fs');
  const path = require('path');

  return function analyticsTracker(req, res, next) {
    let date = new Date();

    let year = date.getFullYear();
    let month = `${date.getMonth()}`.padStart(2, 0);
    let day = `${date.getDate()}`.padStart(2, 0);
    let dateString = `${year}-${month}-${day}`;

    let hours = date.getHours();
    let minutes = `${date.getMinutes()}`.padStart(2, 0);
    let seconds = `${date.getSeconds()}`.padStart(2, 0);
    let timeString = `${hours}:${minutes}:${seconds}`;

    let data = `[${dateString} ${timeString}] ${req.method} ${req.url} `;

    fs.appendFile(`logs/${dateString}.log`, `${data}\r\n`, function(err) {
      if (err) console.error(err);
    });
    return next();
  };
})();
