# DriverReg

> Driver Registrations in AngularJS

## Installation

Install NPM (NodeJS installer) first. Then install all NPM development dependencies by:

```bash
$ npm install
```

Run Grunt build.

```bash
$ grunt
```





## Usage



## Build

To build app run

```bash
$ npm install
$ grunt build
```

### Translation synchronization

For translations we are using Crowdin. 

All strings need to be exported for certain build in a form of POT file. To generate a new POT file from source files AND upload it into Crowdin just run:

```bash
$ grunt translations-export
```

All translations have to imported from Crowdin as PO files and compiled into JS file suitable for the app. This can be done by running:

```bash
$ grunt translations-import
```


### Demo & Develop

To run a live demo or do some hackery, run...

```bash
$ grunt server
```

