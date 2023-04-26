import { AgeField } from "@/components/age_field.component";
import { DateOfBirthField } from "@/components/date_of_birth_field.component";
import { GenderField } from "@/components/gender_field.component";
import { PhoneNumberField } from "@/components/phone_field.component";
import { Box, Button, Card, CardBody, CardHeader, Center, Container, Divider, Heading, Spinner, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdEdit } from 'react-icons/md';
const HomePage = () => {

  const mounted = useRef(false);

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });

      if (result.status === 200) {
        const { user } = await result.json();
        console.log('User: ', user);
        setUser(user);
        setLoading(false);
      } else {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }


    if (!mounted.current) {
      mounted.current = true;
      fetchData();
    }


  }, [mounted]);

  const onLogout = async () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (loading) ? (
    <Center h="100vh">
      <Spinner />
    </Center>
  ) : (
    // full width, height, center horizontally and vertically
    <Container maxW="container.xl" h="100vh" centerContent >


      <Card w='full' maxW='2xl' borderRadius='lg' overflow='hidden' m={8}>
        <CardHeader>
          <Heading size='md'>Authentication Task — Profile Page</Heading>
        </CardHeader>

        <CardBody>
          <Stack
            divider={<StackDivider />}
            spacing='0'>

            <Box className="px-2 py-4">
              <Heading size='md' >
                Welcome {user?.name}
              </Heading>
            </Box>

            <AgeField user={user} onUserUpdate={_user => setUser(_user)} />

            <GenderField user={user} onUserUpdate={_user => setUser(_user)} />

            <PhoneNumberField user={user} onUserUpdate={_user => setUser(_user)} />


            <DateOfBirthField user={user} onUserUpdate={_user => setUser(_user)} />

            <Box className="px-2 py-4 cursor-pointer hover:bg-gray-100" onClick={() => onLogout()}>
              <Heading size='xs' textTransform='uppercase'>
                Logout
              </Heading>
              <Text pt='2' fontSize='sm'>
                Quit this Website. You will be redirected to the login page.
              </Text>
            </Box>

          </Stack>
        </CardBody>
      </Card>

    </Container >)
}

export default HomePage;