import type { Metadata, NextPage } from 'next';
import { Signup } from './signup';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Next.js - sigin',
  };
}

const SignUpPage: NextPage = () => {
  return (
    <div>
      <main>
        <Signup />
      </main>
    </div>
  );
};

export default SignUpPage;
