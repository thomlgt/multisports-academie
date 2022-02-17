<p align="center">
  <img height="100" src=".\front\src\assets\images\logos\logo-fond-bleu-sans-bords-bleuciel.svg">
</p>

# Multisport Académie

Ce code est le squelette qui se cache derrière le site Mutlisport-Académie, visible à cette URL :

***

## La stack technique

**Client:** Angular, Nginx, NgBootstrap

**Server:** NestJS, MongoDB, Mongo-Express

***

## Récupérer le projet

Commencez par vous placer à l'endroit souhaité, et récupérez le code à l'aide de Git :


```bash
 $ git clone https://github.com/thomlgt/multisports-academie.git
```

Se placer ensuite à l'intérieur du répertoire du projet nouvellement créé

```bash
 $ cd multisports-academie
```

***  

## Lancer le projet en local

Le projet est composé de 3 dossiers, dont les noms parlent d'eux même :
- back (contient tout ce qui est relatif à l'**API**)
- front (qui regroupe les UI **client** et **admin**)
- db (qui contient notamment les dumps de **données de test**)

### 1. le back

**Avant de lancer le serveur Node** il faut mettre en place une base de données.  
Pour la phase de développement, nous avons choisi d'utiliser `Docker` pour lancer 2 images :
- Mongo (la BDD)
- Mongo Express (l'interface graphique)

Vous aurez pour ce faire besoin du fichier `docker-compose.yml` 
qui vous a été remis ultérieurement. 


Pour lancer les conteneurs, placez vous là où se trouve ledit fichier et tapez :

```bash
 $ docker-compose up
```

Une fois les conteneurs *up & running* placez vous dans le répertoire correspondant au back :

```bash
 $ cd .\back\
```

et installez les dépendances à l'aide d'`npm` :

```bash
 $ npm i
```

Patientez jusqu'à la fin des installations, et vous êtes *good to go*.  
Vous pouvez lancer le serveur à l'aide de la commande :

```bash
 $ nest start
```

### 2. le front

Les étapes pour lancer le sevreur front sont sensiblement les mêmes que celles lancées précédemment.
Commencez par vous placer à l'intérieur du répertoire front :

```bash
 $ cd ..\front\
```

et installez les dépendances à l'aide d'`npm` :

```bash
 $ npm i
```

Une fois toutes les dépendances correctement installées, 
lancez le serveur avec la commande :

```bash
 $ ng serve
```

***

## informations générales

Ce projet fait usage des ports suivants :

| **Server**    | **Port**      |
| --------|--------------- |
| back | 3000
| Mongo | 27017
| Mongo Express |8081 |
| front | 4200 |

Vous pouvez trouver la documentation Swagger à l'adresse : [http://localhost:3000/api](http://localhost:3000/api)*  
(**sous reserve que le server back soit en cours d'execution*)

***

## Authors

- [@Boussus Samuel](https://github.com/sBoussus)
- [@Brassart Christine](https://www.github.com/khatastrov)
- [@Desaegher Thomas](https://github.com/thomlgt)



