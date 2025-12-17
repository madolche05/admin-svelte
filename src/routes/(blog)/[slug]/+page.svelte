<script lang="ts">
    import { page } from '$app/stores';
    
    // In a real app, we would fetch data in +page.server.ts based on params.slug
    // For now, we just display the slug
    $: slug = $page.params.slug;
</script>

<div class="max-w-3xl mx-auto py-8">
    <div class="mb-8">
        <a href="/" class="btn btn-ghost btn-sm gap-2 pl-0 hover:bg-transparent">
            &larr; Back to Home
        </a>
    </div>

    <article class="prose lg:prose-xl">
        <h1>Blog Post: {slug}</h1>
        <p class="text-base-content/70">Published on Dec 17, 2025</p>
        
        <div class="divider"></div>
        
        <p>
            This is a placeholder content for the blog post <strong>{slug}</strong>.
            In a real application, this content would be fetched from a database or CMS.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </article>
</div>
