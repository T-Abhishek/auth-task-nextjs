import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputRightAddon, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

export const AgeField = ({ user, onUserUpdate }) => {
    const toast = useToast()

    const [editMode, setEditMode] = useState(false);
    const [age, setAge] = useState(user?.age || '');
    const [isAgeInvalid, setIsAgeInvalid] = useState(false);
    const [loading, setLoading] = useState(false);

    const onEdit = async () => {

        const isAgeInvalid = age <= 0 || age > 120;

        setLoading(true);
        setIsAgeInvalid(isAgeInvalid);

        if (isAgeInvalid) {
            toast({
                title: "Invalid Age",
                description: "Please enter a valid age",
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
                    age: age,
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
            Your Age
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
                        id="age"
                        type="age"
                        value={age}
                        placeholder="Enter your age"
                        isInvalid={isAgeInvalid}
                        onChange={(e) => setAge(+e.target.value)} />
                    <InputRightAddon>
                        <Button onClick={onEdit} isLoading={loading}>Save</Button>
                    </InputRightAddon>
                </InputGroup>
            </Box> : <Text pt='2' fontSize='xl'>
                {user?.age || "Please update your age"}
            </Text>

        }

    </Box >
}