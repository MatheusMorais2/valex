export function getBalance(payments: any, recharges: any) {
  let balance: number = 0;
  for (let i = 0; i < payments.length; i++) {
    balance -= payments[i].amount;
  }

  for (let i = 0; i < recharges.length; i++) {
    balance += recharges[i].amount;
  }

  return balance;
}
