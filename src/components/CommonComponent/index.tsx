import React, { Fragment } from 'react'
import ModalAnnouncement from '../Modal/ModalAnnouncement'
import ModalCongratulation from '../Modal/ModalCongratulation'
import ModalMaxWinner from '../Modal/ModalMaxWinner'

export default function CommonComponent() {
  return (
    <Fragment>
        <ModalAnnouncement/>
        <ModalCongratulation/>
        <ModalMaxWinner />
    </Fragment>
  )
}
