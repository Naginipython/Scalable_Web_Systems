<script>
    import PostingHeader from './PostingHeader.svelte';
    import PostingArticle from './PostingArticle.svelte';
</script>

<div>
    <h1 class="flex justify-center text-4xl p-6">Diary App</h1>
</div>
<div class="w-full">
    <PostingHeader />
    <br />
    <PostingArticle />
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.200);
    }
</style>