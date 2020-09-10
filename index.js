const proxy-fetch = require('node-fetch');

const website = "wikipedia.org"
const transferprotocol = "https"

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
  const html = (await (await proxy-fetch(`$transferprotocol://$website${req.url}`)).text())
    .replace(/(href=.)$transferprotocol?:\/\/$website/g, `$1//${req.headers.host}`)
    .replace(
      '</head>',
      '<link media="all" href="/wiki.css" rel="stylesheet" /></head>'
    );

  res.end(html);
};
