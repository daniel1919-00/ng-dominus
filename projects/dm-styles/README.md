# Dominus css utilities

Lightweight library used to style the dominus components demo page. It can be used on any site along any other css libraries since all classes are prefixed with the `dm:` namespace.

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
Append `dm-styles.css` in your site header.
