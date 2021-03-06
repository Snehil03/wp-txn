const app = require("../src/app.js");
const assert = require("chai").assert;

describe("getBalanceByCategoryInPeriod()", () => {
// no transactions 
  it("return 0 if there are no transactions", () => {
    assert.equal(
      app.getBalanceByCategoryInPeriod(
        [],
        "groceries",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      0
    );
  });
 
 // positive return of balance for category 'eating_out'
  it("return calculated postive balance for 'eating_out' category from 2018-03-01 to 2018-03-31", () => {
    const transactions = [
      {
        id: 01,
        sourceAccount: 'my_account',
        targetAccount: 'lunch_point',
        amount: -30,
        category: 'eating_out',
        time: '2018-03-12T12:34:00Z'
      },
      {
        id: 02,
        sourceAccount: 'my_account',
        targetAccount: 'lunch_point2',
        amount: -130,
        category: 'eating_out',
        time: '2018-03-10T12:34:00Z'
      },
      {
        id: 03,
        sourceAccount: 'my_account',
        targetAccount: 'Pizzahut',
        amount: 200,
        category: 'eating_out',
        time: '2018-03-03T12:34:00Z'
      },
      {
        id: 04,
        sourceAccount: 'bank',
        targetAccount: 'my_account',
        amount: 900,
        category: 'saving',
        time: '2018-03-01T12:34:00Z'
      }];
    assert.equal(
      app.getBalanceByCategoryInPeriod(
        transactions,
        "eating_out",
        new Date("2018-03-01T00:00:00Z"),
        new Date("2018-03-31T23:59:59Z")
      ),
      40
     );
  });



 // negative return of balance for category 'eating_out'
  it("return calculated negative balance for 'eating_out' category  from 2018-03-01 to 2018-03-31", () =>{
    const transactions = [
      {
        id: 01,
        sourceAccount: 'my_account',
        targetAccount: 'pizzahut',
        amount: -230,
        category: 'eating_out',
        time: '2018-03-12T12:34:00Z'
      },
      {
        id: 02,
        sourceAccount: 'my_account',
        targetAccount: 'italiano_spices',
        amount: -130,
        category: 'eating_out',
        time: '2018-03-10T12:34:00Z'
      },
      {
        id: 03,
        sourceAccount: 'my_account',
        targetAccount: 'Indian_restaurent',
        amount: 200,
        category: 'eating_out',
        time: '2018-03-03T12:34:00Z'
      },
      {
        id: 04,
        sourceAccount: 'ING_bank',
        targetAccount: 'my_account',
        amount: 900,
        category: 'saving',
        time: '2018-03-01T12:34:00Z'
      }];
    assert.equal(
      app.getBalanceByCategoryInPeriod(
        transactions,
        "eating_out",
        new Date("2018-03-01T00:00:00Z"),
        new Date("2018-03-31T23:59:59Z")
      ),
      -160
     );
  });
 
  // boundry inclusive transactions of 'eating_out'
  it("return balance for boundry cases with inclusivity 2018-03-01 to 2018-03-31 for category 'eating_out' ", () => {
    const transactions = [
      {
        id: 01,
        sourceAccount: 'my_account',
        targetAccount: 'pizzahut',
        amount: -130,
        category: 'eating_out',
        time: '2018-03-01T12:34:00Z'
      },
      {
        id: 02,
        sourceAccount: 'my_account',
        targetAccount: 'italiano_spices',
        amount: -130,
        category: 'eating_out',
        time: '2018-03-31T17:34:00Z'
      },
      {
        id: 03,
        sourceAccount: 'my_account',
        targetAccount: 'Indian_restaurent',
        amount: 400,
        category: 'eating_out',
        time: '2018-03-03T12:34:00Z'
      },
      {
        id: 04,
        sourceAccount: 'ING_bank',
        targetAccount: 'my_account',
        amount: 900,
        category: 'saving',
        time: '2018-03-01T12:34:00Z'
      }];
    assert.equal(
      app.getBalanceByCategoryInPeriod(
        transactions,
        "eating_out",
        new Date("2018-03-01T00:00:00Z"),
        new Date("2018-03-31T23:59:59Z")
      ),
      140
     );
  });
  
  // balance outside transaction interval 
  it("return transactions outside range with outside time interval of 2018-04-01 to 2018-04-31 for category 'eating_out'", () => {
    const transactions = [
      {
        id: 01,
        sourceAccount: 'my_account',
        targetAccount: 'pizzahut',
        amount: -130,
        category: 'eating_out',
        time: '2018-03-01T12:34:00Z'
      },
      {
        id: 02,
        sourceAccount: 'my_account',
        targetAccount: 'italiano_spices',
        amount: -130,
        category: 'eating_out',
        time: '2018-03-31T17:34:00Z'
      },
      {
        id: 03,
        sourceAccount: 'my_account',
        targetAccount: 'Indian_restaurent',
        amount: 400,
        category: 'eating_out',
        time: '2018-03-03T12:34:00Z'
      },
      {
        id: 04,
        sourceAccount: 'ING_bank',
        targetAccount: 'my_account',
        amount: 900,
        category: 'saving',
        time: '2018-03-01T12:34:00Z'
      }];
    assert.equal(
      app.getBalanceByCategoryInPeriod(
        transactions,
        "eating_out",
        new Date("2018-04-01T00:00:00Z"),
        new Date("2018-04-31T23:59:59Z")
      ),
      0
     );
  });
});

