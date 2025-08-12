# Koncile N8N Nodes

Un package de nœuds personnalisés pour n8n qui permet d'intégrer l'API Koncile.ai dans vos workflows d'automatisation.

## 📋 Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Développement](#développement)
- [Tests](#tests)
- [API Koncile](#api-koncile)
- [Déploiement](#déploiement)
- [Dépannage](#dépannage)
- [Contribution](#contribution)
- [License](#license)

## Description

Ce package fournit des nœuds n8n personnalisés pour interagir avec l'API Koncile.ai. Il permet d'uploader des fichiers vers des dossiers et templates spécifiques sur la plateforme Koncile directement depuis vos workflows n8n.

### Nœuds disponibles

- **Koncile Node** : Upload de fichiers vers l'API Koncile avec sélection de dossier et template

### Credentials disponibles

- **Koncile API** : Authentification via clé API pour accéder aux services Koncile

## Fonctionnalités

- ✅ Upload de fichiers binaires vers Koncile.ai
- ✅ Sélection dynamique des dossiers disponibles
- ✅ Sélection dynamique des templates basée sur le dossier choisi
- ✅ Authentification sécurisée via clé API
- ✅ Gestion d'erreurs robuste
- ✅ Support de différents formats de fichiers (PDF, etc.)
- ✅ Tests unitaires intégrés

## Prérequis

- **Node.js** : Version 20.15 ou supérieure
- **n8n** : Installation d'n8n (self-hosted ou cloud)
- **Compte Koncile.ai** : Avec accès API
- **Clé API Koncile** : Obtenue depuis votre compte Koncile

## Installation

### Installation via npm (Recommandée)

```bash
npm install @koncile/n8n-nodes
```

### Installation manuelle

1. Clonez le repository :
```bash
git clone https://github.com/Koncile/n8n-nodes-koncile.git
cd n8n-nodes-koncile
```

2. Installez les dépendances :
```bash
npm install
```

3. Construisez le package :
```bash
npm run build
```

4. Installez le package dans votre instance n8n :
```bash
npm pack
# Puis installez le fichier .tgz généré dans votre instance n8n
```

### Installation dans n8n

#### Self-hosted n8n

1. Ajoutez le package à votre `package.json` ou installez-le directement :
```bash
npm install @koncile/n8n-nodes
```

2. Redémarrez votre instance n8n

#### n8n Cloud

1. Allez dans **Settings** > **Community Nodes**
2. Cliquez sur **Install a community node**
3. Entrez `@koncile/n8n-nodes`
4. Cliquez sur **Install**

## Configuration

### 1. Configuration des credentials Koncile API

1. Dans n8n, allez dans **Credentials**
2. Cliquez sur **+ Add Credential**
3. Recherchez et sélectionnez **Koncile API**
4. Renseignez votre clé API Koncile
5. Testez la connexion en cliquant sur **Test**
6. Sauvegardez les credentials

### 2. Obtenir votre clé API Koncile

1. Connectez-vous à votre compte Koncile.ai
2. Allez dans les paramètres de votre compte
3. Générez ou récupérez votre clé API
4. Copiez la clé pour l'utiliser dans n8n

## Utilisation

### Utilisation basique du nœud Koncile

1. **Ajoutez le nœud Koncile** à votre workflow
2. **Configurez les credentials** : Sélectionnez vos credentials Koncile API
3. **Configurez les paramètres** :
   - **Binary Property** : Nom de la propriété binaire contenant le fichier (par défaut : "data")
   - **Folder** : Sélectionnez le dossier de destination
   - **Template** : Sélectionnez le template à utiliser (dépend du dossier choisi)

### Exemple de workflow

```
HTTP Request (pour télécharger un fichier)
↓
Koncile (pour uploader le fichier)
↓
[Autres nœuds selon vos besoins]
```

### Paramètres du nœud

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| Binary Property | String | Oui | Nom de la propriété binaire contenant le fichier à uploader |
| Folder | Options | Oui | Dossier de destination sur Koncile (chargé dynamiquement) |
| Template | Options | Oui | Template à utiliser (dépend du dossier sélectionné) |

### Données de sortie

Le nœud retourne un objet JSON contenant :
- Les données de réponse de l'API Koncile
- Le nom du fichier uploadé (`uploaded_file_name`)
- Les métadonnées de l'upload

## Structure du projet

```
n8n-nodes-koncile/
├── credentials/                 # Définitions des credentials
│   ├── KoncileApi.credentials.ts      # Credential Koncile API
│   └── KoncileApi.credentials.test.ts # Tests du credential
├── nodes/                      # Définitions des nœuds
│   └── Koncile/
│       ├── Koncile.node.ts           # Nœud principal Koncile
│       ├── Koncile.node.test.ts      # Tests du nœud
│       └── koncile.svg               # Icône du nœud
├── dist/                       # Fichiers compilés (généré)
├── package.json               # Configuration du package
├── tsconfig.json              # Configuration TypeScript
├── jest.config.js             # Configuration des tests
├── gulpfile.js                # Tâches de build (copie des icônes)
├── index.js                   # Point d'entrée (vide)
├── README.md                  # Ce fichier
└── LICENSE.md                 # Licence MIT
```

### Fichiers clés

- **`nodes/Koncile/Koncile.node.ts`** : Implémentation principale du nœud
- **`credentials/KoncileApi.credentials.ts`** : Gestion de l'authentification API
- **`package.json`** : Métadonnées et configuration du package n8n
- **`tsconfig.json`** : Configuration TypeScript pour la compilation

## Développement

### Configuration de l'environnement de développement

1. **Clonez le repository** :
```bash
git clone https://github.com/Koncile/n8n-nodes-koncile.git
cd n8n-nodes-koncile
```

2. **Installez les dépendances** :
```bash
npm install
```

3. **Développement en mode watch** :
```bash
npm run dev
```

### Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run build` | Compile le TypeScript et copie les icônes |
| `npm run dev` | Mode développement avec rechargement automatique |
| `npm test` | Lance les tests Jest |
| `npm run format` | Formate le code avec Prettier |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run lintfix` | Corrige automatiquement les erreurs ESLint |

### Architecture du nœud

Le nœud Koncile est implémenté comme une classe TypeScript qui étend `INodeType` :

```typescript
export class Koncile implements INodeType {
  description: INodeTypeDescription = {
    // Configuration du nœud
  };

  methods = {
    loadOptions: {
      // Méthodes pour charger les options dynamiques
    }
  };

  async execute(this: IExecuteFunctions) {
    // Logique d'exécution principale
  }
}
```

### Fonctionnalités clés du code

#### 1. Chargement dynamique des options

- **`getFolders()`** : Récupère la liste des dossiers disponibles depuis l'API Koncile
- **`getTemplates()`** : Récupère les templates disponibles pour un dossier donné

#### 2. Exécution du nœud

- Validation des données binaires d'entrée
- Upload du fichier via l'API Koncile avec les paramètres sélectionnés
- Gestion des erreurs et retour des résultats

#### 3. Authentification

- Utilisation du système de credentials n8n
- Authentification Bearer Token automatique
- Test de connexion intégré

## Tests

### Lancer les tests

```bash
npm test
```

### Types de tests

- **Tests unitaires** : Validation de la logique des nœuds et credentials
- **Tests d'intégration** : Validation de l'interaction avec l'API Koncile

### Structure des tests

- `credentials/KoncileApi.credentials.test.ts` : Tests du credential
- `nodes/Koncile/Koncile.node.test.ts` : Tests du nœud principal

## API Koncile

### Endpoints utilisés

| Endpoint | Méthode | Usage |
|----------|---------|--------|
| `/v1/check_api_key/` | POST | Validation de la clé API |
| `/v1/fetch_all_folders/` | GET | Récupération des dossiers et templates |
| `/v1/upload_file/` | POST | Upload de fichiers |

### Authentification

L'API utilise l'authentification Bearer Token :
```
Authorization: Bearer YOUR_API_KEY
```

### Format de réponse

#### Dossiers et templates :
```json
{
  "folders": [
    {
      "id": 1,
      "name": "Mon Dossier",
      "templates": [
        {
          "id": 1,
          "name": "Mon Template"
        }
      ]
    }
  ]
}
```

#### Upload de fichier :
```json
{
  "success": true,
  "file_id": "...",
  "message": "File uploaded successfully"
}
```

## Déploiement

### Publication sur npm

1. **Vérifiez la version** dans `package.json`
2. **Construisez le package** :
```bash
npm run build
```
3. **Lancez les tests** :
```bash
npm test
```
4. **Publiez** :
```bash
npm publish
```

### Workflow de déploiement

1. **Développement** → Tests locaux
2. **Build** → Compilation TypeScript
3. **Tests** → Validation automatisée
4. **Publication** → Déploiement sur npm
5. **Installation** → Disponible pour les utilisateurs n8n

### Versioning

Le projet suit le versioning sémantique (SemVer) :
- **MAJOR** : Changements incompatibles avec l'API
- **MINOR** : Nouvelles fonctionnalités compatibles
- **PATCH** : Corrections de bugs

## Dépannage

### Problèmes courants

#### 1. Erreur d'authentification
```
Error: Invalid API key
```
**Solution** : Vérifiez que votre clé API Koncile est correcte et active.

#### 2. Fichier binaire non trouvé
```
Error: No binary data property 'data' found on input
```
**Solution** : Assurez-vous qu'un nœud précédent fournit des données binaires avec le bon nom de propriété.

#### 3. Dossiers/Templates vides
**Solution** : Vérifiez que votre compte Koncile a des dossiers et templates configurés.

#### 4. Erreur de compilation
```
Error: Cannot find module 'n8n-workflow'
```
**Solution** : Installez les peer dependencies :
```bash
npm install n8n-workflow
```

### Logs et débogage

Pour activer les logs détaillés dans n8n :
1. Ajoutez `N8N_LOG_LEVEL=debug` à vos variables d'environnement
2. Redémarrez n8n
3. Consultez les logs dans la console ou les fichiers de log

### Support

En cas de problème :
1. Vérifiez cette documentation
2. Consultez les issues GitHub : https://github.com/Koncile/n8n-nodes-koncile/issues
3. Contactez l'équipe Koncile : tech@koncile.ai

## Contribution

### Guidelines

1. **Fork** le repository
2. **Créez une branche** pour votre feature : `git checkout -b feature/ma-nouvelle-feature`
3. **Développez** votre fonctionnalité
4. **Ajoutez des tests** pour votre code
5. **Lancez les tests** : `npm test`
6. **Formatez le code** : `npm run format`
7. **Vérifiez le linting** : `npm run lint`
8. **Commitez** vos changements : `git commit -m "Ajout de ma nouvelle feature"`
9. **Poussez** vers votre fork : `git push origin feature/ma-nouvelle-feature`
10. **Créez une Pull Request**

### Standards de code

- **TypeScript** strict activé
- **ESLint** pour la qualité du code
- **Prettier** pour le formatage
- **Jest** pour les tests
- **Commentaires** en français ou anglais
- **Commits** explicites et bien documentés

### Tests requis

Tout nouveau code doit inclure :
- Tests unitaires
- Tests d'intégration si applicable
- Documentation mise à jour

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

## Informations du développeur

- **Auteur original** : Nicolas Nguyen (nicolas@koncile.ai)
- **Maintainer actuel** : Équipe Koncile
- **Email** : tech@koncile.ai
- **Entreprise** : Koncile.ai
- **Repository** : https://github.com/Koncile/n8n-nodes-koncile

---

## Notes pour le successeur

### Architecture et décisions techniques

1. **Choix de TypeScript** : Pour la sécurité des types et la maintenabilité
2. **Structure modulaire** : Séparation claire entre nœuds et credentials
3. **Tests intégrés** : Assurance qualité automatisée
4. **API REST** : Communication simple avec Koncile.ai

### Points d'attention

1. **Gestion d'erreurs** : Le code inclut une gestion d'erreurs robuste mais pourrait être étendue
2. **Validation des fichiers** : Actuellement limité aux PDF, extensible selon les besoins
3. **Performance** : Upload synchrone, pourrait être optimisé pour de gros fichiers
4. **Sécurité** : Les clés API sont correctement gérées par n8n

### Évolutions possibles

1. **Support multi-fichiers** : Upload de plusieurs fichiers en une seule opération
2. **Validation avancée** : Vérification des types de fichiers et tailles
3. **Retry logic** : Gestion automatique des échecs temporaires
4. **Webhooks** : Support des notifications de traitement
5. **Batch processing** : Traitement en lot pour de gros volumes

### Ressources utiles

- [Documentation n8n pour développeurs](https://docs.n8n.io/integrations/creating-nodes/)
- [API Koncile Documentation](https://koncile.ai/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

Bonne continuation sur ce projet ! 🚀

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and npm. Minimum version Node 20. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
  ```
  npm install n8n -g
  ```
* Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

## Using this starter

These are the basic steps for working with the starter. For detailed guidance on creating and publishing nodes, refer to the [documentation](https://docs.n8n.io/integrations/creating-nodes/).

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from this template repository.
2. Clone your new repo:
   ```
   git clone https://github.com/<your organization>/<your-repo-name>.git
   ```
3. Run `npm i` to install dependencies.
4. Open the project in your editor.
5. Browse the examples in `/nodes` and `/credentials`. Modify the examples, or replace them with your own nodes.
6. Update the `package.json` to match your details.
7. Run `npm run lint` to check for errors or `npm run lintfix` to automatically fix errors when possible.
8. Test your node locally. Refer to [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) for guidance.
9. Replace this README with documentation for your node. Use the [README_TEMPLATE](README_TEMPLATE.md) to get started.
10. Update the LICENSE file to use your details.
11. [Publish](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) your package to npm.

## More information

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
