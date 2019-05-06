"use strict";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = {
  "no-unused-styles": require("./rules/no-unused-styles")
};

module.exports.configs = {
  recommended: {
    rules: {
      "faicon/no-unused-styles": 2
    }
  }
};
