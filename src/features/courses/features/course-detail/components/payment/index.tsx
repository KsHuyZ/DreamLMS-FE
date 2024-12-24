'use client';
import { Contract, ethers } from 'ethers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Spinner from '@/components/loading/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

import { abi } from '@/abi/enroll.json';
import { Path } from '@/constant';
import {
  useEnrollContract,
  usePayCourse,
} from '@/features/courses/features/course-detail/components/payment/hooks';
interface IPaymentProps {
  courseId: string;
  userId?: string;
  ethPrice?: string;
  recipient?: string;
}
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ENROLL_CONTRACT_ADDRESS;

const PayMent = ({ courseId, userId, ethPrice, recipient }: IPaymentProps) => {
  console.log({ recipient });
  const [open, setOpen] = useState(false);
  const { mutateAsync: payMent, isPending } = usePayCourse(courseId);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string>();
  const { toast } = useToast();
  const { mutateAsync: enroll, isPending: enrolling } =
    useEnrollContract(courseId);

  const onRequestTransaction = async () => {
    if (!window.ethereum) {
      return toast({
        variant: 'destructive',
        title: 'Please download metamask first!',
      });
    }
    if (!userId) {
      return toast({
        variant: 'destructive',
        title: 'Please Sign in!',
      });
    }
    if (!ethPrice || !recipient) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    try {
      setIsLoading(true);
      const signer = await provider.getSigner();
      await provider.send('eth_requestAccounts', []);
      await accountChangedHandler(signer);
      const contract = new Contract(CONTRACT_ADDRESS!, abi, signer);
      const coursePriceEth = ethers.parseEther(ethPrice);
      const taxAmount = ethers.parseEther('0.0005');
      const totalAmount = coursePriceEth + taxAmount;
      await contract.enroll(userId, courseId, coursePriceEth, recipient, {
        value: totalAmount,
      });
      await enroll();
      router.push(Path.PaymentSuccess(courseId));
    } catch (error: any) {
      if (error.reason === 'Insufficient amount sent') {
        toast({ title: 'Insufficient amount sent', variant: 'destructive' });
      }
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const accountChangedHandler = async (newAccount: ethers.JsonRpcSigner) => {
    const address = await newAccount.getAddress();
    setCurrentAccount(address);
  };

  const handlePayment = async () => {
    const result = await payMent();
    router.push(Path.PayCourse(courseId, result.client_secret));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant='outline' onClick={() => setOpen(true)}>
        Buy now
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select payment method</DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-center space-x-8 relative '>
          {(isPending || isLoading || enrolling) && (
            <div className='absolute w-full h-full bg-background/90 backdrop-blur-sm duration-200 flex justify-center items-center'>
              <div className='flex flex-col space-y-4 items-center'>
                <Spinner />
                <Label>Please wait...</Label>
              </div>
            </div>
          )}
          <div
            className='flex flex-col justify-center items-center space-y-2 p-2 px-8 duration-200 rounded-sm hover:bg-gray-300 cursor-pointer'
            onClick={handlePayment}
          >
            <Image
              src='/images/stripe.png'
              width={70}
              height={70}
              alt='stripe'
              className='rounded-md'
            />
            <Label className='font-bold'>Stripe</Label>
          </div>
          <div
            className='flex flex-col justify-center items-center space-y-2 p-2 px-8 duration-200 rounded-sm hover:bg-gray-300 cursor-pointer group'
            onClick={onRequestTransaction}
          >
            <p className='text-muted-foreground text-xs text-center hidden group-hover:block transition duration-300 ease-in-out'>
              To maintain the certificate platform, a 0.0005 ETH fee will apply
            </p>
            <Image
              src='/images/metamask.png'
              width={70}
              height={70}
              alt='metamask'
            />
            <Label className='font-bold'>Metamask</Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayMent;
