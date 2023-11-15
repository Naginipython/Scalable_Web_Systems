<script>
  export let comments = [];
</script>

<ul class="styled">
  {#each comments as comment (comment.id)}
    <li class={comment.status}>{comment.content}</li>
  {/each}
</ul>

<style>
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