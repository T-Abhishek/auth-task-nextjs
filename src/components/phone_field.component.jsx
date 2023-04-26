import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

export const PhoneNumberField = ({ user, onUserUpdate }) => {
    const toast = useToast()

    const [editMode, setEditMode] = useState(false);
    const [phone, setPhone] = useState((user?.phone || '').replace('+91', ''));
    const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
    const [loading, setLoading] = useState(false);

    const onEdit = async () => {

        const isPhoneInvalid = (+phone === NaN) || (phone + '').length !== 10;

        setLoading(true);
        setIsPhoneInvalid(isPhoneInvalid);

        if (isPhoneInvalid) {
            toast({
                title: "Invalid Age",
                description: "Please enter a valid phone",
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
                    phone: '+91' + phone,
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
            Your Phone Number
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
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input
                        id="phone"
                        type="phone"
                        value={phone}
                        placeholder="Enter your phone"
                        isInvalid={isPhoneInvalid}
                        inputMode="tel"
                        onChange={(e) => setPhone(+e.target.value)} />
                    <InputRightAddon>
                        <Button onClick={onEdit} isLoading={loading}>Save</Button>
                    </InputRightAddon>
                </InputGroup>
            </Box> : <Text pt='2' fontSize='xl'>
                {user?.phone || "Please update your phone"}
            </Text>

        }

    </Box >
}