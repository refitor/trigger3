# Trigger3

## trigger3 test
```
test.json format for call:
{
    "vault": {
        "index": 0,
        "kind": "call",
        "contract": "0x1111f6C94433c2222e85555e0ddddddddddddd",
        "params": ""
    }
}
```

```
test.json format for send: 
{
    "vault": {
        "index": 0,
        "kind": "send",
        "contract": "0x1111f6C94433c2222e85555e0ddddddddddddd",
        "params": ""
    }
}
```

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
go build -o ./trigger3 -i
```

### Usage
./trigger3 --help
