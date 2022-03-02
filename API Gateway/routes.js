const ROUTES = [
  {
    url: "/mealsservice",
    proxy: {
      target: "http://localhost:8000/",
      changeOrigin: true,
      pathRewrite: {
        [`^/mealsservice`]: "",
      },
    },
  },
  {
    url: "/passengerservice",
    proxy: {
      target: "http://localhost:7002/",
      changeOrigin: true,
      pathRewrite: {
        [`^/passengerservice`]: "",
      },
    },
  },
  {
    url: "/orderservice",
    proxy: {
      target: "http://localhost:7001/",
      changeOrigin: true,
      pathRewrite: {
        [`^/orderservice`]: "",
      },
    },
  },
];

exports.ROUTES = ROUTES;
