'use client';

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/library/hooks";
import { verifyOtp } from "@/library/features/user/userSlice";

export default function OtpVerification() {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, otpVerified } = useAppSelector(state => state.users);

  const [otp, setOtp] = useState<string>('');
  const [email, setEmail] = useState<string>('');


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp) {
      alert('OTP is required');
      return;
    }

    dispatch(verifyOtp({ otp }));
  };

  useEffect(() => {
    if (otpVerified) {
      router.push('/loginPage'); // Redirect to login page after OTP verification
    }
  }, [otpVerified, router]);


    return (<>


<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6"> 

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Enter OTP
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="otp"
                  name="otp"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify OTP
              </button>
              
            </div>
          </form>
        </div>
      </div>


    </>
    )
  }