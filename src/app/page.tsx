import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

export default function HomePage() {
  redirect(paths.auth.jwt.login);
}
