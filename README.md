# Trigger3
A tool for contract query and trigger calls, supporting any EVM compatible contract

## trigger3 script format
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