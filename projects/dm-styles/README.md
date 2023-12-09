# Dominus css utilities

Lightweight library mainly build to style the dominus components demo page, but can be used on any site along any other css libraries.

## Usage

### Angular 
Add the css file path in `angular.json`:
``` json
{
    "projects": {
        "YOUR_PROJECT": {
            "architect": {
                "build": {
                    "builder": "@angular-devkit/build-angular:browser",
                    "options": {
                        "styles": [
                            "src/styles.scss",
                            "node_modules/@ng-dominus/dm-styles/dm-styles.css"
                        ],
                    },
                },
            }
        }
    },
}
```

### Static website
Append the css file in your site header.
