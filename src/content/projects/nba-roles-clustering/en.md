---
title: 'Do the 5 NBA positions really exist?'
summary: 'Unsupervised learning to cluster NBA players by playing style and check whether the official positions (PG, SG, SF, PF, C) describe those styles.'
date: 2026-11-02
facts:
  - '325 players'
  - 'silhouette 0.25 (k=3)'
tags:
  - K-Means
  - PCA
  - scikit-learn
  - pandas
  - Tableau
repo: 'https://github.com/rodrigolopezu/nba-roles-clustering'
cover: ./dashboard.png
---

Unsupervised learning project: I cluster NBA players by how they play (K-Means + PCA on per-36-minute stats, 2025-26 season) and check whether the official positions (PG, SG, SF, PF, C) describe those styles.

**Stack:** Python, pandas, NumPy, scikit-learn, matplotlib, Jupyter, Tableau.

## Key findings

- **Positions carry some real information.** Point guards and centers are recognizable: 69% of PGs fall in the "lead ball handlers" group and 66% of Cs in the "rim-protecting bigs" group.
- **But they are far from a clean split.** Taking the 5 positions as groups, players are on average as close to other positions as to their own (silhouette 0.02).
- **SG, SF and PF are hard to tell apart.** About half of each (53%, 49%, 48%) land in the same group, "perimeter role players".
- **Real hybrids exist.** Centers Jokić, Şengün and Adebayo cluster with point guard Dončić among the "high-usage scorers".
- **Styles look like a spectrum, not five boxes.** A more natural description is three families: perimeter creators, rim-protecting bigs and perimeter role players.

| Measure | Value |
|---|---|
| Agreement groups vs positions (adjusted Rand index) | 0.13 to 0.18 |
| Agreement expected by chance | below 0.02 |
| K-Means agreement with itself (other seeds) | 0.54 to 1.0 |
| Silhouette: official positions / K-Means k=3 / k=5 | 0.02 / 0.25 / 0.18 |

## How it was done

| Step | Notebook | What happens |
|---|---|---|
| 1. Clean | `01_data_cleaning` | Load the Basketball-Reference per-36 table, fix column names, check duplicates and missing values |
| 2. Features | `02_feature_engineering` | Keep players with 700+ minutes and 15+ per game (325 players), choose 9 style features, standardize |
| 3. Cluster | `03_clustering` | K-Means for k = 2 to 10; inertia, silhouette and stability across random seeds |
| 4. Visualize | `04_pca` | PCA to 2 dimensions: PC1 is interior vs perimeter, PC2 is creation vs rim running |
| 5. Interpret | `05_interpretation` | Name the groups, cross them with positions, measure agreement against chance and stability |
| 6. Share | `tableau/` | Interactive dashboard (player map, positions vs groups, group profile, player list) |

## Limitations

- One season and 325 players after filtering by minutes.
- Only 9 box-score features: nothing about height, defensive assignments or player quality.
- Weak cluster structure (silhouette at most 0.28); the 5-group solution changes with the random seed. Group names are interpretations.

## Data

Season 2025-26 "Per 36 Minutes" table from [Basketball-Reference](https://www.basketball-reference.com/). The processed files in the repository are derived from it.
