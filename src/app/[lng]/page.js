import { redirect } from 'next/navigation';

export default function LocalizedRootPage({ params: { lng } }) {
  redirect(`/${lng}/signin`);
}
