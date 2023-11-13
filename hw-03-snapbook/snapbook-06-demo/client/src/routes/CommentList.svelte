<script>
  export let comments = [];
</script>

<ul>
  {#each comments as comment (comment.id)}
    <li>{comment.content}</li>
  {/each}
</ul>
