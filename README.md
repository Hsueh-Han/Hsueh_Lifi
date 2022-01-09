# hsueh_lifi

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
### JSON Server

```
cd /hsueh_lifi/public
```
```
json-server db.json
```

 `.env.lifi` VUE_APP_API 請與 JSON Server 運行的port號一致。

I. 可選擇調整 `.env.lifi` 環境變數
```
VUE_APP_API = http://localhost:3000
```

II. 或是於終端機指令中指定 JSON Server port
```
json-server db.json --port 3000
```
