
const app = {
    getBalanceByCategoryInPeriod: (transactions = [], category, start, end) => {
        return (transactions.length === 0) ? 0 : transactions.reduce((balance, txn) => {
            return ((txn.category === category)
                && (new Date(txn.time) >= start)
                && (new Date(txn.time) < end)) ? balance + txn.amount : balance;
        }, 0);
    }
};

module.exports = app;