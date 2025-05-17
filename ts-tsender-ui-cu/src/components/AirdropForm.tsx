"use client"
import InputField from "./ui/InputField"
import {useState, useMemo} from "react"
import { chainsToTSender, tsenderAbi,  erc20Abi} from "./constants"
import {useChainId, useReadContract, useConfig, useAccount, useWriteContract} from "wagmi"
import {readContract, writeContract, waitForTransactionReceipt} from "@wagmi/core"
import {calculateTotal} from "../Utils/calculateTotal/calculateTotal"


export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const {data:hash, isPending, writeContractAsync} = useWriteContract()
  

  // every time amount changes, recalculate the total
  const total: number = useMemo(() => (calculateTotal(amount)), [amount]) //Fix this so that the calculation and logging are correct 

  async function getApproveAmount(tSenderAddress: string | null): Promise<number> {
    if (!tSenderAddress) {
      alert("Use supported chain ");
      return 0;
    }

    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });

    return response as number;
  }

  async function handleSubmit() {
    // Handle the updating of form submission

    setIsLoading(true)
    setErrorMessage(null)

    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approveAmount = await getApproveAmount(tSenderAddress);
    const totalAmountNeeded = calculateTotal(amount);

    if (approveAmount < total) {
    const aprovalHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [tSenderAddress as `0x${string}`, BigInt(total)]
    })
    const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: aprovalHash,
    })
      console.log("Approval receipt", approvalReceipt);
    } else {
        await writeContractAsync({
            abi: tsenderAbi,
            address: tSenderAddress as `0x${string}`,
            functionName: "airdropERC20",
            args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipient.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
            ],
        })
    }
  }

  return (
    <div className="space-y-4">
      <InputField
        label="Address"
        placeholder="Enter address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />

      <InputField
        label="Recipient"
        placeholder="0x38725841751258487"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        large
      />

      <InputField
        label="Amount"
        placeholder="100,200"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        large
      />

      <button
      onClick={handleSubmit}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      disabled={isLoading}
      >
     {isLoading ? (
      <div className="flex items-center gap-2">
      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
      Sending...
     </div>
     ) : (
    "Send Tokens"
  )}
</button>

    </div>
  )
}
