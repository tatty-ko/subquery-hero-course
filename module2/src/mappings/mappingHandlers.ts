import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {Block} from "../types";
import {Balance} from "@polkadot/types/interfaces";


export async function handleBlock(block: SubstrateBlock): Promise<void> {
    //Create a new starterEntity with ID using block hash
    let record = new Block(block.block.header.hash.toString());
    //Record block number
    record.blockNumber = block.block.header.number.toNumber();
    await record.save();
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    //Retrieve the record by its ID
    const record = await Block.get(event.extrinsic.block.block.header.hash.toString());
    record.account_to = account.toString();
    //Big integer type Balance of a transfer event
    record.value = (balance as Balance).toBigInt();
    await record.save();
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = await Block.get(extrinsic.block.block.header.hash.toString());
    //Date type timestamp
    record.timestamp = extrinsic.block.timestamp;
    //Boolean tyep
    record.success = true;
    await record.save();
}


