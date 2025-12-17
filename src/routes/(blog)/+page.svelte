<script lang="ts">
    // Mock data for blog posts
    const posts = [
        {
            id: 1,
            title: "Welcome to My New Blog",
            excerpt: "This is the start of something new. We are exploring SvelteKit and DaisyUI.",
            date: "Dec 17, 2025",
            slug: "welcome-to-my-new-blog"
        },
        {
            id: 2,
            title: "Separating Admin and Public Routes",
            excerpt: "How to use Route Groups in SvelteKit to organize your application structure effectively.",
            date: "Dec 16, 2025",
            slug: "separating-admin-and-public-routes"
        },
        {
            id: 3,
            title: "Why SvelteKit is Awesome",
            excerpt: "A deep dive into the features that make SvelteKit a great choice for modern web development.",
            date: "Dec 15, 2025",
            slug: "why-sveltekit-is-awesome"
        }
    ];
</script>

<div class="space-y-12">
    <!-- Hero Section -->
    <div class="hero bg-base-200 rounded-box p-12 text-center">
        <div class="hero-content max-w-md flex-col">
            <h1 class="text-5xl font-bold">Hello there</h1>
            <p class="py-6">Welcome to my personal blog. Here I write about tech, life, and everything in between.</p>
            <button class="btn btn-primary">Read Latest</button>
        </div>
    </div>

    <!-- Post List -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each posts as post}
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-200">
                <div class="card-body">
                    <span class="text-xs text-base-content/60">{post.date}</span>
                    <h2 class="card-title text-2xl mb-2 hover:text-primary cursor-pointer">
                        <a href="/{post.slug}">{post.title}</a>
                    </h2>
                    <p class="text-base-content/80">{post.excerpt}</p>
                    <div class="card-actions justify-end mt-4">
                        <a href="/{post.slug}" class="btn btn-ghost btn-sm">Read More &rarr;</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
