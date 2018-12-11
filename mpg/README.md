Visit [https://floriancourgey.github.io/tools/mpg](https://floriancourgey.github.io/tools/mpg)

# Update dataset
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

# TODO
- [x] store only players id in localStorage. If the dataset is updated, players in storage will keep their old stats
- [x] handle all championships (FR, EN, ES)
- [x] mark players (for next rounds of mercato)
