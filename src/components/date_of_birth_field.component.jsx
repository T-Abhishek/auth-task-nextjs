import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputRightAddon, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

export const DateOfBirthField = ({ user, onUserUpdate }) => {
    const toast = useToast()

    const [editMode, setEditMode] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(
        user?.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().split('T')[0]
            : '');

    console.log('Date of Birth: ', dateOfBirth);

    const [isDobInvalid, setIsDobInvalid] = useState(false);
    const [loading, setLoading] = useState(false);

    const onEdit = async () => {

        const dob = new Date(dateOfBirth);
        let isDobInvalid = false;

        try {
            console.log(
                dob.toISOString().split('T')[0],
                dateOfBirth
            );
            isDobInvalid = dob.toISOString().split('T')[0] !== dateOfBirth;
        } catch (error) {
            isDobInvalid = true;
        }

        setLoading(true);
        setIsDobInvalid(isDobInvalid);

        if (isDobInvalid) {
            toast({
                title: "Invalid Date of Birth",
                description: "Please enter a valid date of birth",
                status: "error",
            })
        } else {
            const result = await fetch('/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    ...user,
                    dateOfBirth: dob,
                }),
            });

            if (result.status === 200) {
                const { user } = await result.json();
                console.log('User: ', user);
                onUserUpdate(user);
                setEditMode(false);
            } else {
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    status: "error",
                })
            }
        }

        setLoading(false);

    }

    return <Box className={"px-2 py-4 " + (!editMode && 'cursor-pointer hover:bg-gray-100')}
        onClick={() => !editMode && setEditMode(!editMode)}>

        <Heading size='xs' textTransform='uppercase'>
            Your Date Of Birth
            {!editMode &&
                <Button
                    rightIcon={<MdEdit />}
                    size='xs' colorScheme='blue'
                    variant='ghost' ml='2'
                    onClick={() => setEditMode(!editMode)}>
                    Edit
                </Button>}
        </Heading>

        {
            editMode ? <Box my={2}>

                {/* charka ui components */}
                <InputGroup size='md'>
                    <Input
                        id="dateOfBirth"
                        type="dateOfBirth"
                        value={dateOfBirth}
                        placeholder="Enter your dateOfBirth"
                        isInvalid={isDobInvalid}
                        type="date"
                        onChange={(e) => setDateOfBirth(e.target.value)} />
                    <InputRightAddon>
                        <Button onClick={onEdit} isLoading={loading}>Save</Button>
                    </InputRightAddon>
                </InputGroup>
            </Box> : <Text pt='2' fontSize='xl'>
                {user?.dateOfBirth ?
                    new Date(user.dateOfBirth).toDateString().replace(/^\S+\s/, '') :
                    "Please update your date of birth"}
            </Text>

        }

    </Box >
}