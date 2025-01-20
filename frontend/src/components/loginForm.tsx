"use client";
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Container,
  Button,
  Input,
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Text,
  InputRightElement,
  FormErrorMessage,
  useBoolean,
  Icon,
  Divider,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { LockIcon, AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle } from "react-icons/fa";
import { emailPattern } from "@/utils";
import { login } from "@/api-calls/auth";
import useCustomToast from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/hooks/useAuth";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [show, setShow] = useBoolean(false);
  const showToast = useCustomToast();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/map");
    }
  }, [router]);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const response = await login(data);

      if (response.status) {
        showToast("Success", response.message, "success");
        console.log(response.message);
        console.log(response.token);
        localStorage.setItem("token", response.token);
        router.push("/map");
      } else {
        showToast("Error", response.message, "error");
      }
    } catch (error) {
      showToast("Error", "An unexpected error occurred.", "error");
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = () => {
    // Optionally, use environment variables for better flexibility
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    const callbackUrl = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL || "http://localhost:3000/map";
    window.location.href = `${backendUrl}/api/v1/auth/login/google`;
  };

  return (
    <Container as="form" maxW="sm" onSubmit={handleSubmit(onSubmit)}>
      <Stack
        gap={4}
        rounded="md"
        p={6}
        shadow="md"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Sign In
        </Text>
        <FormControl id="email" isInvalid={!!errors.email}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AtSignIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type="email"
              {...register("email", {
                required: "Email address is required",
                pattern: emailPattern,

              })}
              variant="filled"
              placeholder="Email address"
            />
          </InputGroup>
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="password" isInvalid={!!errors.password}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <LockIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type={show ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              variant="filled"
              placeholder="Password"
            />
            <InputRightElement width="2.5rem">
              <Icon
                as={show ? ViewOffIcon : ViewIcon}
                onClick={setShow.toggle}
                aria-label={show ? "Hide password" : "Show password"}
                cursor="pointer"
              />
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <HStack justifyContent="space-between" alignItems="center">
          <Button variant="link" color="blue.500" size="sm">
            <Link href="/recover-password">Forgot password?</Link>
          </Button>
        </HStack>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          loadingText="Signing in"
        >
          Submit
        </Button>

        <Divider />

        <Button
          type="button"
          variant="outline"
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={handleGoogleLogin}
          _hover={{ bg: "blue.50" }}
          aria-label="Login with Google"
        >
          Login with Google
        </Button>

        <Text textAlign="center">
          Don't have an account?{" "}
          <Button variant="link" color="blue.500">
            <Link href="/register">Sign up</Link>
          </Button>
        </Text>
      </Stack>
    </Container>
  );
};

export default LoginForm;
