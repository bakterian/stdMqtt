const stdMqtt = require("./stdMqtt");

console.log("TEST STARTS NOW");

// -------------------------- TEST SCENARIOS -----------------------------------

function basicRaspiPublishedData()
{
  let testSuccesfull = false;

  console.log("<<< Complex Test TTN Published Data >>>");
  let basicKeyId = "payload_fields.temperature_val";
  let mqttJsonPayload = JSON.parse("{\"app_id\":\"wemos_nodes\",\"dev_id\":\"wemos_node_uno\",\"hardware_serial\":\"4242454589ABCDEF\",\"port\":1,\"counter\":0,\"is_retry\":true,\"payload_raw\":\"R8VoFkGnCj1CBysAzg==\",\"payload_fields\":{\"humidity_val\":\"33.79\",\"pressure_val\":\"101072.17\",\"rawBytes\":\"[71,197,104,22,65,167,10,61,66,7,43,0,206]\",\"temperature_val\":\"20.88\"},\"metadata\":{\"time\":\"2021-01-17T13:28:12.726454064Z\",\"frequency\":868.3,\"modulation\":\"LORA\",\"data_rate\":\"SF7BW125\",\"airtime\":61696000,\"coding_rate\":\"4/5\",\"gateways\":[{\"gtw_id\":\"eui-b827ebffffcd43b1\",\"timestamp\":2478791661,\"time\":\"\",\"channel\":1,\"rssi\":-65,\"snr\":10,\"rf_chain\":0,\"latitude\":51,\"longitude\":19,\"altitude\":165}]}}");

  let result = stdMqtt.getPayloadOfKey(basicKeyId, mqttJsonPayload);

  if(result.isValid && result.val === "20.88")
  {
    testSuccesfull = true;
  }
  
  return testSuccesfull;
} 

function complexTestTtnPublishedData()
{
  let testSuccesfull = false;

  console.log("<<< Complex Test TTN Published Data >>>");
  let basicKeyId = "temp";
  let mqttJsonPayload = JSON.parse("{\"counter\":\"33264\",\"temp\":\"23.40\",\"humid\":\"32.50\",\"light\":\"125\",\"LED\":\"0\"}");

  let result = stdMqtt.getPayloadOfKey(basicKeyId, mqttJsonPayload);

  if(result.isValid && result.val === "23.40")
  {
    testSuccesfull = true;
  }
  
  return testSuccesfull;
} 
// --------------------------------------------------------------------------


// -------------------------- TEST RUNNER -----------------------------------

let testArray = [basicRaspiPublishedData, complexTestTtnPublishedData];

testArray.forEach( testFunc =>
{
  let result = testFunc();

  if(result)
  {
    console.log("Test Passed");
  }
  else
  {
    console.log("Test Failed");
  }

});
// --------------------------------------------------------------------------