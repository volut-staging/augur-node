"use strict";

const assert = require("chai").assert;
const setupTestDb = require("../../test.database");
const { getUnclaimedMarketCreatorFees } = require("../../../build/server/getters/get-unclaimed-market-creator-fees");


describe("server/getters/get-unclaimed-market-creator-fees", () => {
  const test = (t) => {
    it(t.description, (done) => {
      setupTestDb((err, db) => {
        if (err) assert.fail(err);
        getUnclaimedMarketCreatorFees(db, t.params.marketIds, (err, marketFees) => {
          t.assertions(err, marketFees);
          done();
        });
      });
    });
  };
  test({
    description: "get fees by specifying unfinalized market IDs",
    params: {
      marketIds: [
        "0x0000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000002",
      ],
    },
    assertions: (err, marketFees) => {
      assert.isNull(err);
      assert.deepEqual(marketFees, [
        {
          marketId: "0x0000000000000000000000000000000000000001",
          unclaimedFee: 0,
        },
        {
          marketId: "0x0000000000000000000000000000000000000002",
          unclaimedFee: 0,
        },
      ]);
    },
  });
  test({
    description: "Empty marketIds array",
    params: {
      marketIds: [],
    },
    assertions: (err, marketFees) => {
      assert.isNull(err);
      assert.deepEqual(marketFees, []);
    },
  });
});
