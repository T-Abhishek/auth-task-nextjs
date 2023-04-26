import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputRightAddon, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { Select } from '@chakra-ui/react'

export const GenderField = ({ user, onUserUpdate }) => {
    const toast = useToast()

    const [editMode, setEditMode] = useState(false);
    const [gender, setGender] = useState(user?.gender || '');
    const [loading, setLoading] = useState(false);

    const onEdit = async () => {

        setLoading(true);

        const result = await fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                ...user,
                gender: gender,
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

        setLoading(false);

    }

    return <Box className={"px-2 py-4 " + (!editMode && 'cursor-pointer hover:bg-gray-100')}
        onClick={() => !editMode && setEditMode(!editMode)}>

        <Heading size='xs' textTransform='uppercase'>
            Your Gender
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
                    <Select
                        placeholder='Select your gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value='MALE'>Male</option>
                        <option value='FEMALE'>Female</option>
                    </Select>
                    <InputRightAddon>
                        <Button onClick={onEdit} isLoading={loading}>Save</Button>
                    </InputRightAddon>
                </InputGroup>
            </Box> : <Text pt='2' fontSize='xl'>
                {user?.gender || "Please update your Gender"}
            </Text>
        }

    </Box >
}