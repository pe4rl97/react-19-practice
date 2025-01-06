import { useActionState, useOptimistic } from "react"
import { updateNameInDB } from "../utils/api"
import { useFormStatus } from 'react-dom'

const FormActions = () => {
    const [state, actionFunction, isPending] = useActionState(
        updateName, 
        { 
            name: localStorage.getItem("name") || "Anonymous user",
            error: ''
        }
    );

    const [optimisticName, setOptimisticName] = useOptimistic(state.name);

    async function updateName(prevState, formData: FormData) {
        setOptimisticName(formData.get('name'));
        try {
            const checkName = (formData.get('name') !== null) ? formData.get('name') : ''; 
            const newName = await updateNameInDB(checkName);
            return { name: newName, error: ''};
            
        } catch (error) {
            return { name: prevState.name, error: error}
        }
    }

    return (
        <div className="container-md">
            <p className="username">
                Current user: <span>{optimisticName}</span>
            </p>
            <form action={actionFunction}>
                <input
                    type="text"
                    name="name"
                    required
                />
                <MyButton type="submit">Update</MyButton>
                {!isPending && state.error && <p className="text-danger">{state.error.message}</p>}
            </form>
        </div>
    )
}

function MyButton({children, ...rest}) {
    // const { pending: boolean, data: FormData, method: 'get' | 'post', action: actionFn()} = useFormStatus();
    const { pending } = useFormStatus();

    return (
        <button {...rest}>{ pending ? 'Submitting....' : children }</button>
    )
}

export default FormActions

//another new feature that we can pass ref as prop any component as ref = {ref}