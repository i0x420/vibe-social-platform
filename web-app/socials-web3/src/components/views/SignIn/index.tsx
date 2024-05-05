"use client";

import { formatAddress } from "@/common/functions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { InputGroup } from "@/components/ui/InputGroup";
import { useToast } from "@/components/ui/Toaster/useToast";
import { AccountAPI } from "@/services/apis";
import { useUserStore } from "@/stores/useUserStore";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { get } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
  nftid: string;
};

const SignInScreen = () => {
  const walletConnector = useWallet();
  const { userInfo, setUserInfo } = useUserStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toastNe } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors, isValid, isDirty }
  } = useForm<Inputs>({
    defaultValues: {
      username: "", // dungnguyen
      password: "", // 123456
      nftid: "1"
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true);
    console.log({ data });
    const { error, userInfo: accountInfo } = await AccountAPI.getUserByNFT(
      data.nftid
    );

    if (!error && accountInfo[0]?.password === data?.password) {
      setUserInfo(accountInfo[0]);
      toastNe({ type: "success", description: "Login success!" });

      router.push("/");
    } else {
      toastNe({ type: "error", description: "Login failed" });

      console.log({ error: "Login failed " });

      setUserInfo(null);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-[80vh] w-full">
      <div className="w-fit h-fit min-w-[40vw] bg-background-primary rounded-lg p-4">
        <h1 className="pb-4 border-b text-xl">Welcome to VIBE</h1>
        <div className="flex items-center gap-2 my-4">
          <img
            className="rounded w-8 h-8"
            alt="avatar"
            srcSet={`https://picsum.photos/80/80?random=${1}`}
          />
          <p>{formatAddress(walletConnector.address)}</p>
        </div>

        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            render={({ field }) => (
              <InputGroup errorMessage={get(errors, "username")?.message}>
                <Input placeholder="Username" isBlock {...field} />
              </InputGroup>
            )}
            control={control}
            name="username"
          />
          <Controller
            render={({ field }) => (
              <InputGroup errorMessage={get(errors, "password")?.message}>
                <Input placeholder="Password" isBlock {...field} />
              </InputGroup>
            )}
            control={control}
            name="password"
          />
          {/* <Controller
            render={({ field }) => (
              <InputGroup errorMessage={get(errors, "nftid")?.message}>
                <Input placeholder="NFT ID" isBlock {...field} />
              </InputGroup>
            )}
            control={control}
            name="nftid"
          /> */}

          <div className="flex items-center gap-4 col-span-2">
            <Button isBlock color="secondary" onClick={() => router.back()}>
              Next time
            </Button>
            <Button
              isBlock
              type="submit"
              isLoading={loading}
              disabled={!isValid || !isDirty}
            >
              Join
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInScreen;
