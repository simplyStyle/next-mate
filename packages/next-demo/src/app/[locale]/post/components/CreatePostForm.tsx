'use client';

import { trpc } from '@/common/client-trpc';
import { type RouterInput } from '@/server/types';

export function CreatePostForm() {
  const utils = trpc.useUtils();
  // https://trpc.io/docs/client/react/useUtils#invalidate-full-cache-on-every-mutation
  const addPost = trpc.post.add.useMutation({
    onSuccess() {
      utils.post.list.invalidate();
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        /**
         * In a real app you probably don't want to use this manually
         * Checkout React Hook Form - it works great with tRPC
         * @see https://react-hook-form.com/
         * @see https://kitchen-sink.trpc.io/react-hook-form
         */
        e.preventDefault();
        const $form = e.currentTarget;
        const values = Object.fromEntries(new FormData($form));
        type Input = RouterInput['post']['add'];
        //    ^?
        const input: Input = {
          title: values.title as string,
          text: values.text as string,
        };
        try {
          await addPost.mutateAsync(input);
          $form.reset();
        } catch (cause) {
          console.error({ cause }, 'Failed to add post');
        }
      }}
      className="space-y-2"
    >
      <fieldset>
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          disabled={addPost.isLoading}
          className={
            'py-2 input' +
            (addPost.error?.data?.zod?.title ? ' input--error' : '')
          }
        />
        {addPost.error?.data?.zod?.title && (
          <div style={{ color: 'red' }}>{addPost.error?.data?.zod?.title}</div>
        )}
      </fieldset>
      <div className="col-span-full">
        <label
          htmlFor="text"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Text
        </label>
        <div className="mt-2">
          <textarea
            id="text"
            name="text"
            rows={3}
            defaultValue={''}
            className={
              'input' + (addPost.error?.data?.zod?.text ? ' input--error' : '')
            }
          />
        </div>
        {addPost.error?.data?.zod?.text && (
          <div style={{ color: 'red' }}>{addPost.error?.data?.zod?.text}</div>
        )}
      </div>

      <fieldset>
        <input type="submit" disabled={addPost.isLoading} className="button" />
        {addPost.error && !addPost.error.data?.zod && (
          <p style={{ color: 'red' }}>
            {addPost.error.message}

            {addPost.error.data?.zod && (
              <pre>{JSON.stringify(addPost.error.data.zod, null, 4)}</pre>
            )}
          </p>
        )}
      </fieldset>
    </form>
  );
}
