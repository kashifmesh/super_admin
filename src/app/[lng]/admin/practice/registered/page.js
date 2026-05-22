import React from 'react';
import RegisteredPractices from '../../../components/Admin/RegisteredPractices/RegisteredPractices';

export const metadata = {
  title: 'Registered Practices | DocHyve Super Admin',
  description: 'Master coordinate list of fully approved practices',
};

export default function Page({ params: { lng } }) {
  return (
    <>
      <RegisteredPractices lng={lng} />
    </>
  );
}
