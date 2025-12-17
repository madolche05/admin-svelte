<script lang="ts">
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import type { PageData, ActionData } from './$types';
    import 'easymde/dist/easymde.min.css';

    let { data, form } = $props();
    let { post, tags, selectedTagIds, supabase } = $derived(data);
    let easyMDE: any;

    onMount(async () => {
        const EasyMDE = (await import('easymde')).default;
        
        easyMDE = new EasyMDE({ 
            element: document.getElementById('content') as HTMLElement,
            initialValue: form?.content ?? post.content ?? '',
            forceSync: true,
            uploadImage: true,
            imageAccept: 'image/png, image/jpeg, image/gif, image/webp',
            imageUploadFunction: async (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => {
                try {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
                    const filePath = `post-content/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('images')
                        .upload(filePath, file);

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                        .from('images')
                        .getPublicUrl(filePath);

                    onSuccess(publicUrl);
                } catch (error: any) {
                    console.error('Error uploading image:', error);
                    onError(error.message || 'Failed to upload image');
                }
            },
        });
    });
</script>

<div class="max-w-3xl mx-auto">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Edit Post</h1>
        <div class="flex gap-2">
             <form action="?/delete" method="POST" use:enhance onsubmit={(e) => { if(!confirm('Are you sure you want to delete this post?')) e.preventDefault(); }}>
                <button type="submit" class="btn btn-error btn-outline">Delete</button>
            </form>
            <a href="/admin/posts" class="btn btn-ghost">Cancel</a>
        </div>
    </div>

    {#if form?.error}
        <div class="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{form.error}</span>
        </div>
    {/if}
    
    {#if form?.success}
        <div class="alert alert-success mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Post updated successfully.</span>
        </div>
    {/if}

    <form action="?/update" method="POST" use:enhance enctype="multipart/form-data" class="space-y-6">
        <div class="card bg-base-100 shadow-sm border border-base-200">
            <div class="card-body">
                <div class="form-control w-full">
                    <label class="label" for="title">
                        <span class="label-text">Title</span>
                    </label>
                    <input type="text" name="title" id="title" placeholder="Enter post title" class="input input-bordered w-full" value={form?.title ?? post.title} required />
                </div>

                <div class="form-control w-full">
                    <label class="label" for="slug">
                        <span class="label-text">Slug (Optional)</span>
                    </label>
                    <input type="text" name="slug" id="slug" placeholder="custom-slug-url" class="input input-bordered w-full" value={form?.slug ?? post.slug} />
                </div>

                <div class="form-control w-full">
                    <label class="label" for="featured_image">
                        <span class="label-text">Featured Image</span>
                    </label>
                    {#if post.featured_image}
                        <div class="mb-4">
                            <img src={post.featured_image} alt="Current featured image" class="h-48 w-auto rounded-lg object-cover" />
                        </div>
                    {/if}
                    <input type="file" name="image" id="featured_image" accept="image/*" class="file-input file-input-bordered w-full" />
                    <input type="hidden" name="featured_image" value={post.featured_image ?? ''} />
                </div>

                <div class="form-control w-full">
                    <label class="label" for="excerpt">
                        <span class="label-text">Excerpt</span>
                    </label>
                    <textarea name="excerpt" id="excerpt" class="textarea textarea-bordered h-24" placeholder="Brief summary of the post...">{form?.excerpt ?? post.excerpt ?? ''}</textarea>
                </div>

                <div class="form-control w-full">
                    <label class="label" for="content">
                        <span class="label-text">Content (Markdown)</span>
                    </label>
                    <textarea name="content" id="content" class="textarea textarea-bordered h-96 font-mono" placeholder="# Hello World">{form?.content ?? post.content ?? ''}</textarea>
                </div>

                <div class="form-control w-full">
                     <label class="label" for="tags">
                        <span class="label-text">Tags</span>
                    </label>
                    <div class="flex flex-wrap gap-4 p-4 border border-base-200 rounded-lg">
                        {#if tags.length > 0}
                            {#each tags as tag}
                                <label class="label cursor-pointer gap-2 border border-base-200 rounded-md px-3 py-1 hover:bg-base-200">
                                    <span class="label-text">{tag.name}</span> 
                                    <input 
                                        type="checkbox" 
                                        name="tags" 
                                        value={tag.id} 
                                        class="checkbox checkbox-sm"
                                        checked={selectedTagIds.includes(tag.id)} 
                                    />
                                </label>
                            {/each}
                        {:else}
                            <span class="text-sm text-base-content/60">No tags available.</span>
                        {/if}
                    </div>
                </div>

                <div class="form-control w-full max-w-xs">
                    <label class="label" for="status">
                        <span class="label-text">Status</span>
                    </label>
                    <select name="status" id="status" class="select select-bordered" value={form?.status ?? post.status}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
            </div>
             <div class="card-actions justify-end p-6 border-t border-base-200 bg-base-100 rounded-b-box">
                <button type="submit" class="btn btn-primary">Update Post</button>
            </div>
        </div>
    </form>
</div>