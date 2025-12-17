<script lang="ts">
    import { enhance } from '$app/forms';
    
    // Props from server (misal: error message)
    let { form } = $props();
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="card w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
            <h2 class="card-title justify-center text-2xl mb-4">Admin Login</h2>
            
            {#if form?.error}
                <div role="alert" class="alert alert-error mb-4 py-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{form.error}</span>
                </div>
            {/if}

            <form method="POST" use:enhance>
                <div class="form-control">
                    <label class="label" for="email">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="email" name="email" id="email" placeholder="admin@example.com" class="input input-bordered" required />
                </div>
                <div class="form-control">
                    <label class="label" for="password">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" name="password" id="password" placeholder="******" class="input input-bordered" required />
                    <label class="label">
                        <a href="#" class="label-text-alt link link-hover">Lupa password?</a>
                    </label>
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
</div>
