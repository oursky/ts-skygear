import * as skygearCloud from "skygear/cloud";

skygearCloud.op(
  "greeting",
  function(param) {
    return {
      content: "Hello, " + param.name
    };
  },
  {
    userRequired: false
  }
);
