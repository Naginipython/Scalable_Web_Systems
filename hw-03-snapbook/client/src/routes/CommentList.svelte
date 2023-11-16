<script>
  import { PostStore } from './stores.js';
  export let comments = [];
  export let postId;

  const vote = async (id, vote) => {
    const res = await fetch(`http://localhost:4004/posts/${postId}/comments/${id}/votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vote }),
    });

    const resUpdate = await fetch('http://localhost:4002/posts');
    const dataUpdate = await resUpdate.json();

    PostStore.update((posts) => {
      posts = dataUpdate;
      return posts;
    });
  };
</script>

<ul class="styled">
  {#each comments as comment (comment.id)}
  <li class={comment.status}>
      <button on:click={() => vote(comment.id, 1)}>^</button>
      {comment.votes}
      <button on:click={() => vote(comment.id, -1)}>v</button>
      {comment.content}
    </li>
  {/each}
</ul>

<style>
  button {
    padding: 1px;
    margin: 0;
  }
  .Rejected {
    color: red;
  }
  .styled {
    list-style: none;
    padding: 0;
  }
  .styled li {
    padding-left: 1rem;
    text-indent: -0.75rem;
  }
  .styled .Accepted::before {
    content: '• ';
  }
  .styled .Rejected::before {
    content: 'x ';
  }
</style>