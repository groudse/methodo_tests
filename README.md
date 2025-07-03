# Starter seed : Typescript - Jest

Uses :
* __Jest__ as unit testing engine and reporting engine
* __ts-node__ to perform conversion from TS to JS
* __prettier & ESLint__ for cleaner code
* __Stryker__ as mutation testing engine

## Installation

> npm i


## Running tests

> npm test

## Code coverage

The coverage is automatically run with `npm test`. You have a report directly in console. The HTML report can be found in `reports/coverage/lcov-report/index.html`

## Mutation testing

> npm test:mutation

You need green tests to perform the mutation testing. 

The mutation report will be located in `reports/mutation/index.html`


## Approval Testing 

Capturer le résultat de la fonction computeDamage dans différents scénarios, et vérifier qu’il reste inchangé (snapshot/approval).

Pour faire du Approval Testing robuste, surtout sur du code avec des effets secondaires et du non-déterminisme (comme Math.random), il faut :

1. Utiliser l’interfaçage (abstraction)
- isoler les dépendances non-déterministes derrière une interface, par exemple IRandomProvider.
2. Injecter la dépendance dans la classe à tester
- Modifier ArenaDamageCalculator pour recevoir un IRandomProvider :
3. Créer une implémentation mockée pour les tests
- faire un mock contrôlable dans les approval tests.

### Qualité de tests 

#### Couverture de tests 

````
npm test -- -u
`````

