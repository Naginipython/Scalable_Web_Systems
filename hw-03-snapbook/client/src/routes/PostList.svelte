<script>
  import { onMount } from 'svelte';
  import { PostStore } from './stores.js';
  import CommentCreate from './CommentCreate.svelte';
  import CommentList from './CommentList.svelte';
  let posts = {};

  onMount(async () => {
    const res = await fetch('http://localhost:4002/posts');
    const data = await res.json();
    PostStore.set(data);
  });

  PostStore.subscribe((_posts) => {
    console.log(`PostList: ${JSON.stringify(_posts)}`);
    posts = _posts;
    console.log(posts);
  });
</script>

<div class="d-flex flex-row flex-wrap justify-content-between">
  {#each Object.entries(posts) as [_, post] (post.id)}
    <div class="card post">
      <div class="card-body">
        <h3>{post.title}</h3>
        <CommentList postId={post.id} comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  {/each}
</div>

<style>
  .post {
    margin-bottom: 20px;
    width: 30%;
  }
</style>
