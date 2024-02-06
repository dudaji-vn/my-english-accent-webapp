import React, { Fragment } from "react";
import ModalAnnouncement from "../modal/modal-announcement";
import ModalCongratulation from "../modal/modal-congratulation";
import ModalMaxWinner from "../modal/modal-max-winner";

export default function CommonComponent() {
  return (
    <Fragment>
      <ModalAnnouncement />
      <ModalCongratulation />
      <ModalMaxWinner />
    </Fragment>
  );
}
