# Update dataset
```bash
wget https://api.monpetitgazon.com/stats/championship/{championshipId}/{year}
wget https://api.monpetitgazon.com/stats/championship/1/2018 -O datasets/mydataset.js
```
prepend mydataset.js with `var players =`

# TODO
- store only players id in localStorage. If the dataset is updated, players in storage will keep their old stats
