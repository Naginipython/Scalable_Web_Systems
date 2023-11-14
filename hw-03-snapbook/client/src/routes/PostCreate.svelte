<script>
  import { PostStore } from './stores.js';
  let title = '';

  const makePost = async (event) => {
    const res = await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    title = '';
    console.log(`Client: ${JSON.stringify(data)}`);

    PostStore.update((posts) => {
      return { ...posts, [data.id]: data };
    });
  };
</script>

<div>
  <form on:submit={makePost}>
    <div class="form-group">
      <h3>Title: {title}</h3>
      <input bind:value={title} class="form-control" />
    </div>
    <button class="btn btn-primary">Submit</button>
  </form>
</div>
