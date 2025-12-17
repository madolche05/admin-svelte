<script lang="ts">
    import '../app.css';
    let { children } = $props();
</script>

<div class="min-h-screen bg-base-100 font-sans text-base-content flex flex-col">
    <!-- Public Header -->
    <header class="navbar bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-10 px-4 lg:px-12">
        <div class="flex-1">
            <a href="/" class="text-2xl font-bold tracking-tight">My Blog</a>
        </div>
        <div class="flex-none gap-2">
            <ul class="menu menu-horizontal px-1">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
            <a href="/login" class="btn btn-primary btn-sm">Login</a>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {@render children()}
    </main>

    <!-- Public Footer -->
    <footer class="footer footer-center p-4 bg-base-200 text-base-content">
        <aside>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by My Blog</p>
        </aside>
    </footer>
</div>
