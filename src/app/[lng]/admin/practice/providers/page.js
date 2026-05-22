import React from 'react';
import PracticeProviders from '../../../components/Admin/PracticeProviders/PracticeProviders';

export const metadata = {
  title: 'Practice Providers | DocHyve Super Admin',
  description: 'Master directory of all registered healthcare providers',
};

export default function Page({ params: { lng } }) {
  return (
    <>
      <PracticeProviders lng={lng} />
    </>
  );
}
