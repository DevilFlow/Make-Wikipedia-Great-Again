const fetch = require('node-fetch');
/*response.writeHead(302 , {
           'Location' : 'https://make-wikipedia-great-again.vercel.app/wiki' // This is your url which you want
        });
response.end();*/
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
