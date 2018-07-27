# ts-skygear

## How to use

In package.json add
```
"ts-skygear": "oursky/ts-skygear#{commit id}}"
```
in devDependencies

In tsconfig.json of your project, add
```
"files": ["node_modules/ts-skygear/index.d.ts"]
``` 

Then run ```yarn```

# NOTE(yarn):

Package installed via git URL may have stale cache problem, please add
following line to your CI

`yarn cache clean ts-skygear`
