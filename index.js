const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
  const html = (await (await fetch(`https://wikipedia.org${req.url}`)).text())
    .replace(/(href=.)https?:\/\/wikipedia.org/g, `$1//${req.headers.host}`)
    .replace(
      '</head>',
      '<link media="all" href="/wiki.css" rel="stylesheet" /></head>'
    );

  res.end(html);
};
