<script>
  import { PostStore } from './stores.js';

  // The post ID associated with the comment
  export let postId;

  // The comment content
  let content = '';

  const postComment = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:4001/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const resUpdate = await fetch('http://localhost:4002/posts');
    const dataUpdate = await resUpdate.json();

    PostStore.update((posts) => {
      posts = dataUpdate;
      return posts;
    });

    content = '';
  };
</script>

<div>
  <form on:submit={postComment}>
    <div class="form-group">
      <input bind:value={content} class="form-control" placeholder="Comment" />
    </div>
    <button class="btn btn-primary">Add Comment</button>
  </form>
</div>
