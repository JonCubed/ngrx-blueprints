# ngrx Blueprints

A collection of angular cli blueprints for ngrx.
This is currently in alpha and requires a hack to work with angular cli.
However this used a custom barrel-management library for better support
of barrel files and system-config.js.

## Blueprints

The following blueprints are available:

## ngrx-store

This blueprint will create two files in your *app/shared/* folder

* app.store.ts - contains store interface and initial state.
* app.reducer.ts - contains application root reducer

> Ensures barrel file is present all the way to app root folder.

> Adds barrels to system-config.js

> Bootstraps the store

### How to use

    ```cmd
    > ng generate ngrx-store
    ```

## ngrx-reducer

This blueprint will create two files in a folder you specify

* _name_.reducer.ts - contains reducer and reducer's initial state.
* _name_.reducer.spec.ts - contains test spec for reducer

> Ensures barrel file is present all the way to app root folder.

> Adds barrels to system-config.js

### How to use

    ```cmd
    > ng generate ngrx-reducer heroes/reducers/heroes
    ```

## How to install

Copy the *addon* folder into *node_modules/angular-cli/*.
You can now use blueprints with the generate command.