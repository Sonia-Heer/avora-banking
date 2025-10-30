"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";
import { createTransaction } from "@/lib/actions/transaction.actions";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { BankDropdown } from "./BankDropdown";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(1, "Enter a valid amount"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  sharableId: z.string().min(8, "Please select a valid sharable Id"),
});

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      sharableId: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const receiverAccountId = decryptId(data.sharableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };

      const transfer = await createTransfer(transferParams);

      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);
        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col text-foreground">
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Transfer Funds
      </h2>
      <p className="text-sm text-foreground mb-6">
        Send money between your connected bank accounts or to another user.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="senderBank"
            render={() => (
              <FormItem className="py-6">
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-sm font-semibold text-foreground">
                    Select Source Bank
                  </FormLabel>
                  <FormDescription className="text-xs text-foreground">
                    Choose the account you want to send funds from
                  </FormDescription>
                  <FormControl>
                    <BankDropdown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="py-6">
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-sm font-semibold text-foreground">
                    Transfer Note
                  </FormLabel>
                  <FormDescription className="text-xs text-foreground">
                    Add a short message or reference for this transfer
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short note here..."
                      className="rounded-lg border-gray-400 focus:ring-2 focus:ring-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </div>
              </FormItem>
            )}
          />

          <div className="pt-8 pb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Recipient Details
            </h3>
            <p className="text-sm text-foreground">
              Enter recipient’s account information
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="py-6">
                <FormLabel className="text-sm font-semibold text-foreground">
                  Recipient&apos;s Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. johndoe@gmail.com"
                    className="rounded-lg border-gray-400 focus:ring-2 focus:ring-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sharableId"
            render={({ field }) => (
              <FormItem className="py-6">
                <FormLabel className="text-sm font-semibold text-foreground">
                  Receiver&apos;s Plaid Sharable ID
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the recipient's sharable ID"
                    className="rounded-lg border-gray-400 focus:ring-2 focus:ring-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="py-6">
                <FormLabel className="text-sm font-semibold text-foreground">
                  Amount
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 250.00"
                    className="rounded-lg border-gray-400 focus:ring-2 focus:ring-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <div className="pt-8 flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-brand-primary hover:bg-brand-secondary hover:text-tertiary-text text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all hover:shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                "Transfer Funds"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default PaymentTransferForm;
