import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser = useLoaderData()
    const handleUpdateUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email);
        const updateUser = { name, email };

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div>
            {
                loadedUser.name
            }
            <form onSubmit={handleUpdateUser}>
                <input type="text" name='name' defaultValue={loadedUser?.name} /> <br />
                <input type="email" name='email' defaultValue={loadedUser?.email} /><br />
                <input type="submit" value='Submit' /><br />
            </form>
        </div>
    );
};

export default Update;