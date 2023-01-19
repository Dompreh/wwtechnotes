import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/UseTitle'
import User from './User'

import { useGetUsersQuery } from './usersApiSlice'

function UsersList() {
  useTitle('Admin/Manager TechNotes')
  const {data:users, isLoading, isSuccess, isError, error} = useGetUsersQuery(
    'usersList',{
      pollingInterval:60000,
      refetchOnFocus:true,
      refetchOnMountOrArgChange:true
    }
  )

  let content

  if(isLoading) content = <PulseLoader color={"#FFF"}/>


  if(isError) {
    content =<p className={"errormsg"}>{error?.data?.message}</p>
  }
  if(isSuccess){
    const {ids} = users

    const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId}/>)

    content = (<table className='table table--users'>
      <thead className='table_thead'>
        <tr>
          <th scope='col' className='table__th user__username'>Username</th>
          <th scope="col" className='table__th user__roles'>Roles</th>
          <th scope="col" className='table__th user__edit'>Edit</th>
        </tr>
      </thead>
      <tbody>
        {tableContent}
      </tbody>
    </table>)
  }
  return content
}

export default UsersList