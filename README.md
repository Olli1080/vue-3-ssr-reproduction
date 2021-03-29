# vue-3-ssr-reproduction

This is a reproduction for a bug caused by upgrading from vue@3.0.7 to vue@3.0.8 or vue@3.0.9

When initialy rendering the spa server side the scopeId for the router-view is not applied
This changes only after navigation

The project can be run in dev or production mode by altering the variable isDev in line 10 in entry.ts
