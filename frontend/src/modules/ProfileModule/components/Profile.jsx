import React, { useLayoutEffect } from 'react';

import { useProfileContext } from '@/context/profileContext';
import AdminInfo from './AdminInfo';
import UpdateAdmin from './UpdateAdmin';
import PasswordModal from './PasswordModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { crud } from '@/redux/crud/actions';

const Visibility = ({ isVisible, children }) => {
  const show = isVisible ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
  return <div style={show}>{children}</div>;
};

export default function Profile({ config }) {
  const { state } = useProfileContext();
  const { update, read, passwordModal } = state;
  const { _id } = useSelector(selectCurrentAdmin);
  // using the crud redux to fetch and update the admin
  const entity = 'profile';

  config = { ...config, id: _id };

  return (
    <>
      <Visibility isVisible={read.isOpen}>
        <AdminInfo config={config} />
      </Visibility>
      <Visibility isVisible={update.isOpen}>
        <UpdateAdmin config={config} />
      </Visibility>
      <PasswordModal config={config} isVisible={passwordModal.isOpen} />
    </>
  );
}
