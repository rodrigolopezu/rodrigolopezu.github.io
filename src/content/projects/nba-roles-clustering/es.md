---
title: '¿Existen realmente las 5 posiciones de la NBA?'
summary: 'Aprendizaje no supervisado para agrupar jugadores de la NBA por su estilo de juego y comprobar si las posiciones oficiales (PG, SG, SF, PF, C) describen esos estilos.'
date: 2026-11-02
facts:
  - '325 jugadores'
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

Proyecto de aprendizaje no supervisado: agrupo a los jugadores de la NBA según cómo juegan (K-Means + PCA sobre estadísticas por 36 minutos, temporada 2025-26) y reviso si las posiciones oficiales (PG, SG, SF, PF, C) describen esos estilos.

**Stack:** Python, pandas, NumPy, scikit-learn, matplotlib, Jupyter, Tableau.

## Hallazgos principales

- **Las posiciones sí aportan información.** Los bases y los pívots se reconocen: el 69 % de los PG cae en el grupo de "armadores principales" y el 66 % de los C en el de "grandes protectores del aro".
- **Pero están lejos de ser una división limpia.** Tomando las 5 posiciones como grupos, los jugadores están en promedio igual de cerca de otras posiciones que de la suya (silhouette 0.02).
- **SG, SF y PF casi no se distinguen.** Alrededor de la mitad de cada una (53 %, 49 %, 48 %) cae en el mismo grupo, "jugadores de rol de perímetro".
- **Existen híbridos reales.** Los pívots Jokić, Şengün y Adebayo se agrupan con el base Dončić entre los "anotadores de alto uso".
- **Los estilos parecen un espectro, no cinco cajas.** Una descripción más natural son tres familias: creadores de perímetro, grandes protectores del aro y jugadores de rol de perímetro.

| Medida | Valor |
|---|---|
| Acuerdo grupos vs. posiciones (adjusted Rand index) | 0.13 a 0.18 |
| Acuerdo esperado por azar | menor a 0.02 |
| Acuerdo de K-Means consigo mismo (otras semillas) | 0.54 a 1.0 |
| Silhouette: posiciones oficiales / K-Means k=3 / k=5 | 0.02 / 0.25 / 0.18 |

## Cómo se hizo

| Paso | Notebook | Qué pasa |
|---|---|---|
| 1. Limpiar | `01_data_cleaning` | Carga de la tabla por 36 minutos de Basketball-Reference, arreglo de nombres de columnas, revisión de duplicados y faltantes |
| 2. Variables | `02_feature_engineering` | Jugadores con más de 700 minutos y 15 o más por partido (325), selección de 9 variables de estilo, estandarización |
| 3. Agrupar | `03_clustering` | K-Means con k de 2 a 10; inercia, silhouette y estabilidad entre semillas |
| 4. Visualizar | `04_pca` | PCA a 2 dimensiones: PC1 es interior vs. perímetro, PC2 es creación vs. correr hacia el aro |
| 5. Interpretar | `05_interpretation` | Nombrar los grupos, cruzarlos con las posiciones, medir el acuerdo contra el azar y la estabilidad |
| 6. Compartir | `tableau/` | Dashboard interactivo (mapa de jugadores, posiciones vs. grupos, perfil de cada grupo, lista de jugadores) |

## Limitaciones

- Una sola temporada y 325 jugadores tras filtrar por minutos.
- Solo 9 variables de box score: nada sobre estatura, asignaciones defensivas ni calidad del jugador.
- Estructura de grupos débil (silhouette de 0.28 como máximo); la solución de 5 grupos cambia con la semilla. Los nombres de los grupos son interpretaciones.

## Datos

Tabla "Per 36 Minutes" de la temporada 2025-26 de [Basketball-Reference](https://www.basketball-reference.com/). Los archivos procesados del repositorio se derivan de ella.
