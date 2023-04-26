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

    const [email, setEmail] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const onLogin = async () => {

        const _isEmailValid = isValidEmail(email);
        const _isPasswordValid = isValidPassword(password);

        setIsEmailInvalid(!_isEmailValid);
        setIsPasswordInvalid(!_isPasswordValid);



        if (!_isEmailValid) {
            // charka ui toast
            setIsEmailInvalid(true);
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address",
                status: "error",
            })
        } else if (!_isPasswordValid) {
            toast({
                title: "Invalid Password",
                description: "Please enter a valid password",
                status: "error",
            })
        } else {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await res.json()
            console.log('Login response: ', data)

            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: "You are now logged in",
                    status: "success",
                });
                localStorage.setItem('token', data.token)
                window.location.href = '/'
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                })
            }

        }
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
                        <Stack spacing="5">
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
                        </Stack>
                        <Divider />

                        <Stack spacing="6">
                            <Button
                                variant="primary"
                                background={'blue.300'}
                                onClick={() => onLogin()}
                                color={'white'}>Log in</Button>
                            <HStack>
                                <Divider />
                                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                                    or
                                </Text>
                                <Divider />
                            </HStack>
                        </Stack>
                        <HStack spacing="1" justify="center">
                            <Text color="muted">Don't have an account?</Text>
                            <Button
                                variant="link"
                                colorScheme="blue"
                                onClick={() => {
                                    window.location.href = '/register'
                                }}
                            >
                                Register
                            </Button>
                        </HStack>
                    </Stack>
                </Box>
            </Stack >
        </Container >
    </>
};

export default LoginPage;