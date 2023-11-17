import Link from 'next/link';
import { type RouterOutput } from '@/server/types';

export type PostListOutput = RouterOutput['post']['list'];
type ListItem = PostListOutput['items'][number];

export function PostListItem(props: { post: ListItem }) {
  const { post } = props;
  return (
    <Link
      href={`/post/${post.id}`}
      className='sm:px-6" block p-4 hover:bg-gray-50'
    >
      <article>
        <div className="flex items-center justify-between">
          <p className="truncate text-sm font-medium text-indigo-600">
            {post.title}
          </p>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex"></div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <p>
              Added on{' '}
              <time dateTime={post.createdAt.toISOString()}>
                {post.createdAt.toLocaleDateString('en-us')}
              </time>
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

PostListItem.Skeleton = function PostListItemSkeleton() {
  return (
    <div className='sm:px-6" block p-4 hover:bg-gray-50'>
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300"></div>
      <div className="mt-2">
        <div className="h-2 w-1/2 animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  );
};
