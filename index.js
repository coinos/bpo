let { RPCHOST, RPCPORT, RPCUSER, RPCPASS, RPCWALLET } = process.env;

export default ({ host = RPCHOST, port = RPCPORT, wallet = RPCWALLET, username = RPCUSER, password = RPCPASS }) =>
  new Proxy(
    {},
    {
      get:
        (target, prop) =>
        (...params) =>
          ((method, ...params) => {
            let url = `http://${host}:${port}/wallet/${wallet}`;
            return fetch(url, {
              method: "POST",
              body: JSON.stringify({
                method,
                params,
              }),
              headers: {
                "content-type": "application/json",
                authorization: `Basic ${Buffer.from(
                  `${username}:${password}`
                ).toString("base64")}`,
              },
            })
              .then((r) => r.json())
              .then(({ result }) => result);
          })(prop.toLowerCase(), ...params),
    }
  );
