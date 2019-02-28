import skygear, { RecordCls, Record } from "skygear";
import * as skygearCloud from "skygear/cloud";
import { getSigner } from "skygear-core/dist/cloud/asset";

skygearCloud.op(
  "greeting",
  function(param, option): { content: string } {
    return {
      content: "Hello, " + param.name + option.context
    };
  },
  {
    keyRequired: false,
    userRequired: true
  }
);

skygearCloud.every("@daily", function() {
  console.log("Meow");
});

skygearCloud.event("after-plugins-ready", function() {
  console.log("Meow");
});

skygearCloud.handler(
  "private",
  function(req, options) {
    // cloud code handling the request
    const {
      context,
      container // a cloud code container for the current request context
    } = options;
    return {
      status: "ok",
      user_id: context.user_id // only available if userRequired=true
    };
  },
  {
    method: ["GET", "POST"],
    userRequired: true
  }
);

skygearCloud.handler("skygearResponse", function() {
  return new skygearCloud.SkygearResponse({
    statusCode: 404,
    headers: {
      "Content-Type": "application/json"
    },
    body: '{"a": "b"}'
  });
});

class ProviderCls {}
skygearCloud.provides("auth", "com.facebook", ProviderCls);

class Provider extends skygearCloud.BaseAuthProvider {
  async login(authData: skygearCloud.AuthData) {
    console.log(authData);
    return {
      principal_id: "identifier",
      auth_data: {}
    };
  }

  async logout(authData: skygearCloud.AuthData) {
    console.log(authData);
  }

  async info(authData: skygearCloud.AuthData) {
    console.log(authData);
  }
}

skygearCloud.hook("before-save", function(newRecord, oldRecord, pool) {
  console.log("Meow");
  console.log(oldRecord.createdAt);
  console.log(pool);
  return newRecord;
});

skygearCloud.beforeSave(
  "note",
  function(record, original, pool, options) {
    record.attributeKeys;
    original.createdBy;
    return;
  },
  {
    async: true
  }
);

skygearCloud.afterSave(
  "note",
  function(record, original, pool, options) {
    // cloud code handling the request
    return;
  },
  {
    async: true
  }
);

skygearCloud.beforeDelete(
  "note",
  function(record, original, pool, options) {
    // cloud code handling the request
    return;
  },
  {
    async: true
  }
);

skygearCloud.afterDelete(
  "note",
  function(record, original, pool, options) {
    // cloud code handling the request
    return;
  },
  {
    async: true
  }
);

skygearCloud.staticAsset("/styles", function() {
  // Return the absolute path of the static assets directory
  // http://<yourapp>.skygeario.com/static/styles will be serving files
  // located at '<project_path>/css`
  const __dirname = "projectpath";
  return __dirname + "/css/";
});

skygearCloud.configModule("moduleName", { ignoreWarning: true });

const container = skygearCloud.getContainer();
const requestData = {
  auth_data: { email: "123@test.com" },
  password: "12345678"
};
container.makeRequest("auth:signup", requestData);

skygear
  .lambda("user:signup", { payload: { user: "123", password: "456" } })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });

const record: any = {};

skygear.auth._authResolve(record).then(r => {
  console.log(r);
});

getSigner()
  .sign("asset_id")
  .then(url => {
    console.log(url);
  });
