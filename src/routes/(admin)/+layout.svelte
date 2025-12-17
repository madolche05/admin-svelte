<script lang="ts">
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Navbar from '$lib/components/Navbar.svelte';

    let { children } = $props();
</script>

<div class="drawer lg:drawer-open bg-base-100 font-sans text-base-content">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col min-h-screen">
        <Navbar />
        <main class="flex-1 p-6 bg-base-200/50">
             {@render children()}
        </main>
    </div>
    <Sidebar />
</div>