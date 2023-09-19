# mago-web-app-v3
A vue multitenant app scaffolding

## Project setup
* Private environment variables are required see .env file for the template
```
yarn
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
for running e2e testing you should locally run the application
```
yarn dev
```
to open the e2e testing UI run
```
yarn test:e2e:local 
```
to perform the e2e test suite headless
```
yarn test:e2e:local 
yarn test:e2e:local:headless
```

# Multitenancy
This application support multitenancy by default.
For configure a new tenant you **must** follow this steps:
- configure the env variable: VITE_TENANT=*tenantname*
- configure the env variable: VITE_TENANT_CODE=*tenantcode*
- add the folder src/assets/img/*tenantname*, place in this folder the logo and images required by the app, copy file dimensions from main tenant
- set up the tenant dedicated pipeline and the env variables on Azure, add the azure-pipeline.yml file see azure-pipelines-PROD.yml as example

---

# Components Design System
The components structure of this project is based on [Atomic design](https://atomicdesign.bradfrost.com/)

##Rules
Basic rules for categorizing components.

###Atoms
path: *src/components/atoms*
- Smallest undividable components
- Generic, they contain **no logic**, built for reusability
- They can have variations
- They have 1 folder level

###Molecules
path: *src/components/molecules*
- They are a combination of atoms and molecules
- Also Generic, they contain **no logic**, built for reusability
- They can have variations
- They have slots
- They have 1 folder level

###Organisms
path: *src/components/organisms*
- They are a combination of atoms and molecules and organisms
- Specific, they **can contain app-related logic**
- They can push/pull data from store/services
- They have variations
- They have slots
- They have 1 folder level

###Templates
path: *src/components/templates*
- They are the combination of atoms, molecules, and organisms
- They present the layout of a page
- They have no data
- They **contain business logic**
- They have 2 folder level

###Pages
path: *src/components/pages*
- They are specific instances of components
- They define the list of pages of the app
- They push/pull data from store/services
- They have 2 folder level
