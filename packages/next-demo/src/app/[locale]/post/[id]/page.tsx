import { HydrateClient } from '@hyperse-io/next-trpc';
import { rsc } from '@/server/rsc';

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page(props: PageProps) {
  const post = await rsc.post.byId.fetch({ id: props.params.id });

  return (
    <HydrateClient state={await rsc.dehydrate()}>
      <div className="p-4">
        <article className="prose overflow-hidden rounded-md bg-white p-4 shadow-md">
          <h1>{post.title}</h1>

          {post.text.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}

          <details>
            <summary>Raw data</summary>
            <pre>{JSON.stringify(post, null, 4)}</pre>
          </details>
        </article>
      </div>
    </HydrateClient>
  );
}
