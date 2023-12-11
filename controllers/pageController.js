const path = require('path');

const renderIndex = (req, res) => {
  res.sendFile( path.join(__dirname, '..', 'views/pages', 'index.html'));
};

module.exports = { renderIndex };