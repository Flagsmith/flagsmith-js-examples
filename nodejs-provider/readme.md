# open-feature-flagsmith-provider-node and demo app

Install the dependancies : 

`npm i`

Start the server : 

`npm run dev`

Testing the provider :

``
`To test the string evaluation 

body : {
    "flagKey": "banner",
    "defaultValue": "100x100",
    "evaluationMethod": "string" 
}

response :{
    "value": "400x600",
    "reason": "some reason for resolveStringEvaluation",
    "flagMetadata": {},
    "flagKey": "banner"
}


To test the number evaluation

body : {
    "flagKey": "impressive-feature",
    "defaultValue": 0,
    "evaluationMethod": "number" 
}

response :{
    "value": 123,
    "reason": "some reason for resolveNumberEvaluation",
    "flagMetadata": {},
    "flagKey": "impressive-feature"
}

To test the boolean evaluation

body : {
    "flagKey": "impressive-feature",
    "defaultValue": true,
    "evaluationMethod": "boolean" 
}

response :{
    "value": false,
    "reason": "some reason for resolveBooleanEvaluation",
    "flagMetadata": {},
    "flagKey": "impressive-feature"
}

To test the object evaluation

body : {
    "flagKey": "impressive-feature-json",
    "defaultValue": { size: 'small' },
    "evaluationMethod": "object" 
}

response :{
    "value": {
        "field1": "value1",
        "field2": "value2"
    },
    "reason": "some reason for resolveObjectEvaluation",
    "flagMetadata": {},
    "flagKey": "impressive-feature-json"
}
`