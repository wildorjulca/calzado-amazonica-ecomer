
'use client'

import Avatar from 'react-avatar'

interface Props {
  name : string
}
const AvatarMyAccount = ({  name}: Props) => {
  return (
    <div>
        <Avatar name={name} color='#999999' size='60' round/>
    </div>
  )
}

export default AvatarMyAccount