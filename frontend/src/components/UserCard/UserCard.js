// import './UserCard.css'
// import {useNavigate} from "react-router-dom";
// import {useDispatch} from "react-redux";
// import {deleteUser} from "../../redux/usersSlice";
// import axiosInstance, {imageBaseUrl} from "../../api/api";

// function UserCard({user, backgroundColor}) {
//     const {username, name, profilePicture} = user;
//     const navigator = useNavigate();
//     const dispatch = useDispatch()

//     const deleteUserHandler = () => {
//         if (!window.confirm(`Are you sure you want to delete ${username}?`)) {
//             return;
//         }
//         axiosInstance.delete(
//             `users/delete/${user.id}/`
//         ).then(() => {
//             dispatch(deleteUser(user.id));
//         }).catch(error => {
//             console.error(error)
//         })
//     }

//     return (
//         <div className={'user-card'} style={{backgroundColor: backgroundColor}}>
//             <img src={imageBaseUrl + profilePicture} alt={username}/>
//             <div className={'user-info'}>
//                 <h3>{name}</h3>
//                 <p>@{username}</p>
//             </div>
//             <div className={'user-actions'}>
//                 <button onClick={() => navigator(`edit-user?user=${user.id}`)}>Edit</button>
//                 <button onClick={deleteUserHandler}>Delete</button>
//             </div>
//         </div>
//     );
// }

// export default UserCard;