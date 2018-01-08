const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key) {
  newList=list.map((validKey)=>validKey.toUpperCase())
  return newList.find(function(validKey){
    newKey=key.toUpperCase();
    return newKey==validKey;
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.pushKeyValuePair=function() {
  if(!contains(this.validKeys,this.currentKey))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
