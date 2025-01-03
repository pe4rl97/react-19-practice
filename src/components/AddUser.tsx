import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { useActionState, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import DisplayUsers, { User } from './DisplayUsers';

type UserData = Omit<User, 'id'> & {errorMessage: string};

const initialUserData: UserData = {
    name: '',
    birthDate: moment().format('YYYY-MM-DD'),
    occupation: '',
    errorMessage: ''
};

// ------------------Here commented code is extra code which we had to write before useActionState() (react v19)
const AddUser = () => {
    // const [userData, setUserData] = useState<UserData>(initialUserData);
    const [state, actionFunction, isPending] = useActionState(handleAction, initialUserData);
    // const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setUserData({ ...userData, [name]: value });
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const newData = {...userData, birthDate: userData.birthDate.split('-').reverse().join('-')};
    //     try {
    //         const response = await axios.post('http://localhost:9090/users', newData);

    //         setIsSubmitted(true);
    //         console.log('User created: ', response.data);
            
    //     } catch (error) {
    //         if (error instanceof AxiosError) {
    //             setErrorMessage(error.message);
    //             console.error('Error creating user:', error.message);
    //         }
    //     }

       
    //     setUserData(initialUserData);
    //     setTimeout(() => {
    //         setIsSubmitted(false);
    //         setErrorMessage('');
    //     }, 3000);
    // };

    async function handleAction(prevState: UserData, formData: FormData) {
        const data = {
            name: formData.has('name') ? formData.get('name') : '',
            birthDate: formData.has('birthDate') ? formData.get('birthDate')?.toString().split('-').reverse().join('-'): '',
            occupation: formData.has('occupation') ? formData.get('occupation') : '',
        }
        try {
            const response = await axios.post('http://localhost:9090/users', data);
            setIsSubmitted(true);
            const responseData = response.data;
            delete responseData.id;
            return { ...responseData, errorMessage: ''};
            
        } catch (error) {
            if (error instanceof AxiosError) {
                return { ...prevState, error: error.message };
            }
        } finally {
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        }
    }

    return (
        <Container fluid="md">
            <h1 className="my-3">Add User</h1>
            {isSubmitted && <Alert variant="success">User added successfully!</Alert>}
            {state.errorMessage && <Alert variant="danger">{state.errorMessage}</Alert>}
            <Form action={actionFunction}>
                <Row className="mb-3">
                    <Col md="4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md="4">
                        <Form.Label>BirthDate</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            name="birthDate"
                            placeholder="Enter BirthDate"
                            max={moment().format('YYYY-MM-DD')}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md="4">
                        <Form.Label>Occupation</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="occupation"
                            placeholder="Enter Occupation"
                        />
                    </Col>
                </Row>
                <Button type="submit" variant="primary">
                    {isPending ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
            <DisplayUsers isUpdated={isSubmitted} />
        </Container>
    );
};

export default AddUser;
