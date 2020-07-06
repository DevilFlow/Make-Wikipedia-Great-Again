const fetch = require('node-fetch');
let headers = new Headers({
    "User-Agent"   : "MY-UA-STRING"
});
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
  const html = (await (await fetch(`https://wikipedia.org${req.url}`, {
    method  : 'GET', 
    headers : headers 
}).text())
    .replace(/(href=.)https?:\/\/wikipedia.org/g, `$1//${req.headers.host}`)
    .replace(
      '</head>',
      '<link media="all" href="/wiki.css" rel="stylesheet" /></head>'
    );

  res.end(html);
};
/*  const html = (await (await fetch(`https://wikipedia.org${req.url}`)).text())
    .replace(/(href=.)https?:\/\/wikipedia.org/g, `$1//${req.headers.host}`)
    .replace(
      '</head>',
      '<link media="all" href="/wiki.css" rel="stylesheet" /></head>'
    );*/
