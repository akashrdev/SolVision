import * as solanaweb3 from '@solana/web3.js';
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

const LoginButton = () => {
  const searchAddress = '2hYSJTQst2Ca71ZQwVExXCWtgDmjAmKLJwNhdDYqWk3j';
  const solanaConnection = new solanaweb3.Connection(endpoint);
  const getTransactions = async (address, numTx) => {
    const pubKey = new solanaweb3.PublicKey(address);
    let transactionList = await solanaConnection.getSignaturesForAddress(
      pubKey,
      { limit: numTx }
    );
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

  return (
    <button
      className="bg-purple-900 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded flex align-middle items-center"
      onClick={getTransactions}
    >
      Login
    </button>
  );
};

export default LoginButton;
