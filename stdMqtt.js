
// ============================== HELPER FUCNTION ================================
function isDictionary(obj)
{
   return ((typeof obj==='object') && 
           (obj!==null) && 
           (!Array.isArray(obj)) && 
           (!(obj instanceof Date)));
}
// ================================================================================

// ============================ EXPORTED FUNCITONS ================================



/**
 * Finds the key value in a mqtt Topic Payload structure
 *
 * @param pathPieces  Array of keyContainers and and the actual keyID.
 *                    A value will be returned for the given keyID (if found).
 *                    i.e. payload_fields.pressure_val -> [] {"payload_fields", "pressure_val"}
 * 
 * @param obj         the mqtt topic payload.
 * 
 * @return Object with two key value pairs. 
 * [Check isValid prior to reading val.]
 * {
 *  isValid: <is this a valid result was the searched parameter found>
 *  val:  <parameter value or -1 in case no value was provided>
 * };
 */
exports.getPayloadChunk = function(pathPieces, obj)
{
  var res = {isValid: false, val: -1};

  if((typeof(obj) != "undefined") &&
      (Array.isArray(pathPieces)) &&
      (pathPieces.length > 0))
  {
    var searchedPiece = pathPieces[0];
		if(isDictionary(obj))
    {
      for(let [k, v] of Object.entries(obj))
      {
        if(k == searchedPiece)
        {
          if(pathPieces.length == 1)
          {//found the payload chunk
            res.isValid = true;
            res.val = v;
          }
          else
          { //remove one piece from the array and recurse deeper
            pathPieces.shift()
            res = exports.getPayloadChunk(pathPieces, v)
          }
        }
        if( res.isValid == true ) break;
      }
    }
    else if(Array.isArray(obj))
    {
      for(var i in obj)
      { //verify all array elements
        res = exports.getPayloadChunk(pathPieces, obj[i])
        if( res.isValid == true ) break;
      }
    }
    else
    {
      console.log("[getPayloadChunk()] error obj type: " + typeof(obj))
    }
  }

  else
  {
    console.log("[getPayloadChunk()] wrong input args.")
  }

  return res;
}


/**
 * Finds the key value in a mqtt Topic Payload structure. Wrapper of getPayloadChunk.
 *
 * @param pathPieces  a string represented payload path "someKey1.someKey2.keyID".
 *                    A value will be returned for the given keyID (if found).
 * 
 * @param mqttPayload  the mqtt topic payload.
 * 
 * @return Object with two key value pairs. 
 * [Check isValid prior to reading val.]
 * {
 *  isValid: <is this a valid result was the searched parameter found>
 *  val:  <parameter value or -1 in case no value was provided>
 * };
 */
exports.getPayloadOfKey = function(payloadPath, mqttPayload)
{
  let pathPieces = payloadPath.split('.');

  var payloadChunkSearchResult = exports.getPayloadChunk(pathPieces, mqttPayload);

  if(payloadChunkSearchResult.isValid == false)
  {
    console.log("[ERROR] a valid key value could not be found");
  }

  return payloadChunkSearchResult;
}

// =======================================================================
