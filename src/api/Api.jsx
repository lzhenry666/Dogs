import React from 'react'
import Userpost from './endpoints/Userpost'
import TokenPost from './endpoints/Tokenpost'
import PhotoGet from './endpoints/PhotoGet'
import PhotoPost from './endpoints/PhotoPost'

const Api = () => {
  return (
    <div>
      <h2>UserPost</h2>
      <Userpost />

      <hr />
      <h2>TokenPost</h2>
      <TokenPost />


      <hr />
      <h2>PhotoPost</h2>
      <PhotoPost />



      <hr />
      <h2>PhotoGet</h2>
      <PhotoGet />

    </div>
  )
}

export default Api
