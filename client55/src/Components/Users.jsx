import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const users = useLoaderData()
    const handleUserDelet = (userId) => {
        console.log(userId);
        fetch(`http://localhost:5000/users/${userId}`,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.deleteCount>0) {
                alert('delete successfully')
            }
        })
    }
    return (
        <div>
            {users.length}

            {
                users.map((user, idx) => <div key={idx}> {user._id}, {user.name}, <Link to={`/users/${user._id}`}>update</Link> {user.email}  <button onClick={() => handleUserDelet(user._id)}>delet</button></div> )
            }
        </div>
    );
};

export default Users;