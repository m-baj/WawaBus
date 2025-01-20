import { Footer } from "@/components/footer";
import { Stack } from "@chakra-ui/react";
import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      <div className="flex justify-center flex-grow">
        {" "}
        <Stack spacing={5} align="center" justify="center" paddingBottom={5}>
          <img src="/assets/logo.png" alt="logo" width="200" />
          <main>{children}</main>
        </Stack>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
