# mmwallet
Тут собираются разные данные вокруг проекта некастодиального кошелька MAPS.ME.

  curl https://thrilling-ancient-season.solana-mainnet.discover.quiknode.pro/283aac082ab6a74a4ed6df3ce6e193eca1736a49/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0", "id":1, "method":"getTokenAccountBalance", "params": ["AN2YMu5Nz9aSoR3zgUciBsqfrwkp2qoMkmKt195o11Rf"]}'


  curl https://thrilling-ancient-season.solana-mainnet.discover.quiknode.pro/283aac082ab6a74a4ed6df3ce6e193eca1736a49/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d $'[
    {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getSignaturesForAddress",
      "params": ["AN2YMu5Nz9aSoR3zgUciBsqfrwkp2qoMkmKt195o11Rf",{"limit": 3}]
      }
  ]'

  curl https://thrilling-ancient-season.solana-mainnet.discover.quiknode.pro/283aac082ab6a74a4ed6df3ce6e193eca1736a49/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d $'
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getTransaction",
    "params": [
      "Rk5FxEAqFV7VfeEBokoCT7C7KWvQmJSDdf4VNxWdodFdPNgV37Gzt1tt1SyshdwjqvEb5LwK8kNRP8xuZZwudR7",
      "json"
    ]
  }'