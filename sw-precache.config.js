module.exports = {
  root: 'src',
  runtimeCaching: [{
    urlPattern: /https:\/\/api.punkapi.com\/v2\/beers.*/,
    handler: 'networkFirst',
  }],
};
