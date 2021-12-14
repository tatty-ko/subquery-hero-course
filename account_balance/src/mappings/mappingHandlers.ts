import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {Account} from "../types";
import {Balance} from "@polkadot/types/interfaces";



export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    //Retrieve the record by its ID
    let record = new Account(event.extrinsic.block.block.header.hash.toString());
    //Assign the Polokadot address
    record.account = account.toString();
    //Assign the balance
    record.balance = (balance as Balance).toBigInt();

    logger.info("\nAccount: "+record.account +
    "\nBalance: "+record.balance)

    await record.save();
}
