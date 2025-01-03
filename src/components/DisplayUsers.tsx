import axios, { AxiosError } from 'axios';
import { useEffect, useState, useTransition } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

export interface User {
    id: number,
    birthDate: string,
    name: string,
    occupation: string
}

interface Props {
    isUpdated: boolean
}

const DisplayUsers = ({ isUpdated }: Props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9090/users');
                startTransition(() => {
                    setUsers(response.data || []);
                });
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error.message);
                    startTransition(() => {
                        setError(error.message);
                    })
                }
            } 
        }
        fetchUsers();
    }, [isUpdated])

    return (
        <>
            <h2>List of Users</h2>
            {isPending && <Spinner animation="border" variant="primary" />}
            {error && <Alert variant='danger'>{error}</Alert>}
            <ul>
                {users?.map((user) => (
                    <li key={user.id}>
                        <strong>{user.name}</strong> - Birthdate: {user.birthDate},
                        Profession: {user.occupation}
                    </li>
                ))}
            </ul>

        </>
    )
}

export default DisplayUsers