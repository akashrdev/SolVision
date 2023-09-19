export default async function getTransactions (address, numTx) => {
  const pubKey = new solanaweb3.PublicKey(address);
  let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {
    limit: numTx,
  });
  let signatureList = transactionList.map((transaction) => {
    return transaction.signature;
  });
  let transactionDetails = await solanaConnection.getParsedTransactions(
    signatureList
  );
  transactionList.forEach((transaction, index) => {
    const date = new Date(transaction.blockTime * 1000);
    const transactionInstructions =
      transactionDetails[index].transaction.message.instructions;
    console.log('Transaction Num:', index + 1);
    console.log('Signature:', transaction.signature);
    console.log('Time', date);
    console.log('Status:', transaction.confirmationStatus);

    transactionInstructions.forEach((instruction, num) => {
      console.log(
        `--- Program Instructions ${num + 1}: ${
          instruction.program ? instruction.program + ':' : ''
        } ${instruction.programId.toString()}`
      );
    });
    console.log('-'.repeat(20));
  });
};
