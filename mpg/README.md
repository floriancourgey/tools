Visit [https://floriancourgey.github.io/tools/mpg](https://floriancourgey.github.io/tools/mpg)

# Automatic update
Starting from 1/17/2019, this tool now assumes you have a working internet connection. The datasets are automatically fetched from MPG.

# Update dataset (@deprecated)
```bash
wget https://api.monpetitgazon.com/stats/championship/{championshipId}/{year}
wget https://api.monpetitgazon.com/stats/championship/1/2018 -O datasets/mydataset.js
```
prepend mydataset.js with `players[{championshipId}] =`

Example
```bash
wget https://api.monpetitgazon.com/stats/championship/1/2018 -O datasets/2018-fr-20181210.js
echo -e "players[1] =\n$(cat datasets/2018-fr-20181210.js)" > datasets/2018-fr-20181210.js
```

Where:
- `1` is the French Ligue 1 id
- `2` is the English Premier League id
- `3` is the Spanish Liga id

# TODO
- [x] store only players id in localStorage. If the dataset is updated, players in storage will keep their old stats
- [x] handle all championships (FR, EN, ES)
- [x] mark players (for next rounds of mercato)
