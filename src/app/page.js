'use client';
import { useState, useEffect } from 'react';
import * as solanaweb3 from '@solana/web3.js';
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

export default function Home() {
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

  useEffect(() => {
    getTransactions(searchAddress, 10);
  }, []);

  return (
    <div class="flex align-middle justify-center items-center h-screen w-screen">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex">
        should be a button
      </button>
    </div>
  );
}
