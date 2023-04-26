import { isValidEmail, isValidPassword } from '@/utils/validators';
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { useRef, useState } from 'react';

import { HiEye, HiEyeOff } from 'react-icons/hi'
import { useToast } from '@chakra-ui/react'


const LoginPage = () => {
    const toast = useToast()


    const [name, setName] = useState("");
    const [isNameInvalid, setIsNameInvalid] = useState(false);

    const [email, setEmail] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const onRegister = async () => {

        setLoading(true);

        const _isEmailValid = isValidEmail(email);
        const _isPasswordValid = isValidPassword(password);
        const _isConfirmPasswordValid = isValidPassword(confirmPassword);

        setIsEmailInvalid(!_isEmailValid);
        setIsPasswordInvalid(!_isPasswordValid);
        setIsConfirmPasswordInvalid(
            !_isConfirmPasswordValid ||
            password !== confirmPassword
        );

        if (!_isEmailValid) {
            // charka ui toast
            setIsEmailInvalid(true);
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address",
                status: "error",
            })
        }

        if (!_isPasswordValid) {

            if (password.length < 8) toast({
                title: "Invalid Password",
                description: `Password must be at least 8 characters long`,
                status: "error",
            })

            if (
                /[a-z]/.test(password) === false ||
                /[A-Z]/.test(password) === false
            ) toast({
                title: "Invalid Password",
                description: `Must contain at least one uppercase letter & atleast one lowercase letter`,
                status: "error",
            })

            if (/[0-9]/.test(password) === false ||
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) === false
            ) toast({
                title: "Invalid Password",
                description: `Must contain at least one number & at least one special character`,
                status: "error",
            })
        }

        if (password !== confirmPassword) {
            toast({
                title: "Password Mismatch",
                description: "Please enter a valid confirm password",
                status: "error",
            })
        }

        if (
            _isEmailValid &&
            _isPasswordValid &&
            _isConfirmPasswordValid &&
            password === confirmPassword
        ) {
            // all okay proceed

            const result = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (result.status === 200) {
                toast({
                    title: "Registration Successful",
                    description: "Please login to continue",
                    status: "success",
                });

                window.location.href = '/login';
            } else {
                const data = await result.json();
                toast({
                    title: "Registration Failed",
                    description: data.message,
                    status: "error",
                });
            }
        }

        setLoading(false);
    }

    return <>
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6">
                    {/* <Logo /> */}
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={{ base: 'xs', md: 'sm' }}>Authentication Task</Heading>
                        <Text>Demonstrating auth using username and password</Text>
                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={{ base: 'transparent', sm: 'bg-surface' }}
                    boxShadow={{ base: 'none', sm: 'md' }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing="6">
                        <Heading
                            textAlign={'center'}
                            size={{ base: 'sm', md: 'base' }}>Registration</Heading>

                        <Stack spacing="5">

                            <FormControl>
                                <FormLabel htmlFor="email">Name</FormLabel>
                                <Input
                                    id="name"
                                    type="name"
                                    value={name}
                                    isInvalid={isNameInvalid}
                                    onChange={(e) => setName(e.target.value)} />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    isInvalid={isEmailInvalid}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <IconButton
                                            variant="link"
                                            aria-label={showPassword ? 'Mask password' : 'Reveal password'}
                                            icon={showPassword ? <HiEyeOff /> : <HiEye />}
                                            onClick={(e) => setShowPassword(!showPassword)}
                                        />
                                    </InputRightElement>
                                    <Input
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        isInvalid={isPasswordInvalid}
                                        autoComplete="current-password"
                                        required
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Confirm Password</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <IconButton

                                            variant="link"
                                            aria-label={showConfirmPassword ? 'Mask password' : 'Reveal password'}
                                            icon={showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                                            onClick={(e) => setShowConfirmPassword(!showConfirmPassword)}
                                        />
                                    </InputRightElement>
                                    <Input
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        name="password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        isInvalid={isConfirmPasswordInvalid}
                                        autoComplete="current-password"
                                        required
                                    />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                        <Divider />

                        <Stack spacing="6">
                            <Button
                                variant="primary"
                                background={'blue.300'}
                                isLoading={loading}
                                onClick={() => onRegister()}
                                color={'white'}>Register</Button>
                            <HStack>
                                <Divider />
                                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                                    or
                                </Text>
                                <Divider />
                            </HStack>
                        </Stack>
                        <HStack spacing="1" justify="center">
                            <Text color="muted">Already have an account?</Text>
                            <Button
                                variant="link"
                                colorScheme="blue" onClick={() => {
                                    window.location.href = '/login'
                                }}>
                                Login
                            </Button>
                        </HStack>
                    </Stack>
                </Box>
            </Stack >
        </Container >
    </>
};

export default LoginPage;