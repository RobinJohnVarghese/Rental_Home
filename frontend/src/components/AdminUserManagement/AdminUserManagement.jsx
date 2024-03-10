import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { useSelector} from "react-redux";



const UserList = () => {

    const [users, setUsers] = useState([]);
    const admin = useSelector((state)=>state.admin);
    const [searchTerm, setSearchTerm] = useState('');
    


    useEffect(() => {
        axios.get(`${baseURL}admin-side/user-list/`,{
          headers: {
            Authorization: `Bearer ${admin.adminAccessToken}`,
          },
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [admin.adminAccessToken]);

    

    const handleSearch = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.get(`${baseURL}admin-side/users/search/?search=${searchTerm}`);
        const data = response.data; 
        setUsers(data);
        
      } catch (error) {
        console.error('Error searching:', error);
      }
    };

    const handleBlockUnblock = async (userId, is_active) => {
      console.log('USERID',userId)
        try {
          const url = `${baseURL}admin-side/users/${userId}/${is_active ? 'block' : 'unblock'}/`;
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${admin.adminAccessToken}`,
            },
          });
      
          if (!response.ok) {
            throw new Error(`Failed to ${is_active ? 'unblock' : 'block'} user.`);
          }
          
          setUsers(prevUsers => {
            return prevUsers.map(user => {
              if (user.id === userId) {
                return { ...user, is_active: !is_active };
              }
              return user;
            });
          });
      
        } catch (error) {
          console.error('Error:', error.message);
        }
      };     

    return (

        <div style={{ maxWidth: '90%', margin: 'auto', marginTop: '20px', textAlign: 'center' }}>
  <h1 style={{ marginBottom: '10px' }}>User List</h1>

  <form style={{ width: '50%', display: 'flex', marginBottom: '20px' }}>
    <input
      type='search'
      placeholder='Search'
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ borderRadius: '10px', flex: '1', marginRight: '10px', padding: '8px' }}
    />
    <button
      onClick={handleSearch}
      style={{ borderRadius: '10px', padding: '8px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
    >
      Search
    </button>
  </form>

  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
    <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
      <tr>
        <th style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>ID</th>
        <th style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Name</th>
        <th style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Email</th>
        <th style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
          <td style={{ padding: '10px' }}>{user.id}</td>
          <td style={{ padding: '10px' }}>{user.name}</td>
          <td style={{ padding: '10px' }}>{user.email}</td>
          <td style={{ padding: '10px' }}>
            <button
              onClick={() => handleBlockUnblock(user.id, user.is_active)}
              style={{
                borderRadius: '5px',
                padding: '6px 12px',
                backgroundColor: user.is_active ? '#28a745' : '#dc3545',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {user.is_active ? 'Block' : 'UnBlock'}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



    );
};

export default UserList;
