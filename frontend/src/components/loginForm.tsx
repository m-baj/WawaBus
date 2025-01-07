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
} from "@chakra-ui/react";
import Link from "next/link";
import { LockIcon, AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { emailPattern } from "@/utils";
import { login } from "@/api-calls/auth";
import useCustomToast from "@/hooks/useCustomToast";
import { redirect } from "next/navigation";
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

  useEffect(() => {
    if (isLoggedIn()) {
      redirect("/user");
    }
  }, []);

  const [show, setShow] = useBoolean(false);
  const showToast = useCustomToast();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const response = await login(data);

    if (response.status) {
      showToast("Success", response.message, "success");
      console.log(response.message);
      console.log(response.token);
      localStorage.setItem("token", response.token);
      redirect("/");
    } else {
      showToast("Error", response.message, "error");
    }
  };

  return (
    <Container as="form" maxW="sm" onSubmit={handleSubmit(onSubmit)}>
      <Stack
        gap={4}
        rounded="md"
        p={4}
        shadow="md"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Sign in
        </Text>
        <FormControl id="email" isInvalid={!!errors.email}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AtSignIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type="text"
              {...register("email", {
                required: "Email address is required",
                pattern: emailPattern,
              })}
              variant="filled"
              placeholder="Email address"
              required
            />
          </InputGroup>
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl label="Password">
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
              required
            />
            <InputRightElement width="2.5rem" _hover={{ cursor: "pointer" }}>
              <Icon
                as={show ? ViewOffIcon : ViewIcon}
                onClick={setShow.toggle}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Icon>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button variant="link" color="blue.500">
          <Link href={"recover-password"}>Forgot password?</Link>
        </Button>
        <Button type="submit" border="1px" isLoading={isSubmitting}>
          Submit
        </Button>
        <Text textAlign="center">
          Already have an account?{" "}
          <Button variant="link" color="blue.500" textAlign="center">
            <Link href={"register"}>Sign up</Link>
          </Button>
        </Text>
      </Stack>
    </Container>
  );
};

export default LoginForm;