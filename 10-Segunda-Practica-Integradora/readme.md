# Configuración Standar.js

En caso de que aparezcan errores en el código pegar la siguiente configuración en standard en ./node_modules/standard/eslintrs.json

{
    "extends": ["standard", "standard-jsx"],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "no-tabs": 0,
        "eol-last": ["error", "never"],
        "quotes": [
            "error",
            "double"
        ],
        "camelcase": "off"
    }
}

Si los errores todavía persisten configurar la extensión de ESlint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint